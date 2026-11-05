"""Score each run's best hierarchy on train/test against fixed baselines.

Run from src/ after scripts/experiment_manager.py has finished:
    python evaluate_experiment.py ../results/<EXPERIMENT_NAME>
Writes into that folder:
  - evaluation.csv: event-weighted AUC over leaves with both classes (the GE fitness).
  - evaluation_pooled.csv: one ROC over the hours of *all* leaves, so false alarms in
    anomaly-free leaves count, plus precision/recall/F1 when the top 5% of scores are flagged.
Prints a summary with one-sample Wilcoxon tests of GE test AUC against each
(deterministic) baseline.
"""
import glob
import json
import os
import sys

import numpy as np
import pandas as pd
from scipy.stats import wilcoxon
from sklearn.metrics import roc_auc_score, precision_score, recall_score, f1_score

from fitness.mobai_utils import pheno_to_dict, create_final_hierarchy, calculate_AUC_hierarchy, leaf_scores

DATA = "../datasets/Mobai/"
GRAMMAR_CATEGORIES = ["Call Type", "Event Type", "Subscriber Type", "Traffic Type", "Service Type"]
FLAG_RATE = 0.05


def read_phenotype(best_txt):
    with open(best_txt) as f:
        text = f.read()
    return text.split("Phenotype:\n", 1)[1].split("\nGenotype:", 1)[0]


def baselines():
    categories = json.load(open(DATA + "available_categories.json"))
    yield "Fully aggregated", [{}]
    for c in GRAMMAR_CATEGORIES:
        yield f"By {c}", [{c: v} for v in categories[c]]
    combos = pd.read_csv(DATA + "not_empty_combinations.csv").drop(columns="Number of examples (rows)")
    yield "Fully disaggregated", combos.to_dict("records")


def pooled_metrics(aggregated_df):
    scored = [leaf_scores(leaf) for leaf in aggregated_df.values() if not leaf.empty]
    scored = [s for s in scored if s is not None]
    y_true = np.concatenate([y for y, _ in scored])
    scores = np.nan_to_num(np.concatenate([s for _, s in scored]), nan=0.0, posinf=1.0, neginf=0.0)
    flagged = scores >= np.quantile(scores, 1 - FLAG_RATE)
    return {"Pooled AUC": roc_auc_score(y_true, scores), "Anomaly rate": y_true.mean(),
            "Precision@5%": precision_score(y_true, flagged, zero_division=0),
            "Recall@5%": recall_score(y_true, flagged), "F1@5%": f1_score(y_true, flagged)}


def evaluate(name, run, hierarchy, splits, rows, pooled_rows):
    row = {"Hierarchy": name, "Run": run, "Leaves": len(hierarchy)}
    for split, (df, is_train) in splits.items():
        aggregated_df = create_final_hierarchy(df, hierarchy, is_train=is_train)
        row[f"{split} AUC"] = calculate_AUC_hierarchy(aggregated_df)
        pooled_rows.append({"Hierarchy": name, "Run": run, "Leaves": len(hierarchy), "Split": split,
                            **pooled_metrics(aggregated_df)})
    rows.append(row)
    print(row, flush=True)


def main(results_dir):
    train = pd.read_csv(DATA + "train_set.csv")
    # First test row (2022-09-14 18:00) belongs to the train window.
    test = pd.read_csv(DATA + "test_set.csv")[1:].copy()
    splits = {"Train": (train, True), "Test": (test, False)}

    rows, pooled_rows = [], []
    for best in sorted(glob.glob(os.path.join(results_dir, "*", "best.txt"))):
        evaluate("GE best", os.path.basename(os.path.dirname(best)), pheno_to_dict(read_phenotype(best)),
                 splits, rows, pooled_rows)
    if not rows:
        sys.exit(f"No */best.txt found under {results_dir}")
    for name, hierarchy in baselines():
        evaluate(name, "-", hierarchy, splits, rows, pooled_rows)

    out = pd.DataFrame(rows)
    out.to_csv(os.path.join(results_dir, "evaluation.csv"), index=False)
    pooled = pd.DataFrame(pooled_rows)
    pooled.to_csv(os.path.join(results_dir, "evaluation_pooled.csv"), index=False)

    ge = out.loc[out.Hierarchy == "GE best", "Test AUC"]
    print("\nGE best over {} runs: test AUC {:.4f} +/- {:.4f} (train {:.4f})".format(
        len(ge), ge.mean(), ge.std(), out.loc[out.Hierarchy == "GE best", "Train AUC"].mean()))
    for _, b in out[out.Hierarchy != "GE best"].iterrows():
        diff = ge - b["Test AUC"]
        p = wilcoxon(diff).pvalue if len(ge) > 1 and diff.any() else float("nan")
        print(f"  vs {b.Hierarchy:<28} test AUC {b['Test AUC']:.4f}  mean diff {diff.mean():+.4f}  Wilcoxon p={p:.4g}")

    print("\nPooled metrics (test):")
    print(pooled[pooled.Split == "Test"].groupby("Hierarchy", sort=False)
          [["Pooled AUC", "Precision@5%", "Recall@5%", "F1@5%", "Anomaly rate"]].mean().round(4))


if __name__ == "__main__":
    main(sys.argv[1])
