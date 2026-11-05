"""Figures and tables for the Results chapter from an evaluated experiment.

Run from src/ after evaluate_experiment.py:
    python plot_results.py ../results/<EXPERIMENT_NAME> <OUTPUT_DIR>
Writes PNGs to OUTPUT_DIR and prints markdown: results tables, structure of the
evolved hierarchies per seed, and, for the run with the best *training* AUC
(selecting on test AUC would leak the test set), a Mermaid tree and a per-leaf table.
"""
import glob
import os
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from evaluate_experiment import DATA, read_phenotype
from fitness.mobai_utils import pheno_to_dict, create_final_hierarchy, calculate_AUC, leaf_scores

M = 168
GE = "GE best"


def seed_of(run):
    return run.rsplit("_", 1)[-1]


def save(fig, out_dir, name):
    fig.tight_layout()
    fig.savefig(os.path.join(out_dir, name), dpi=150)
    plt.close(fig)


def plot_auc_vs_baselines(ev, out_dir):
    """One figure per period, with the same row order and x range so they can be compared."""
    ge = ev[ev.Hierarchy == GE]
    base = ev[ev.Hierarchy != GE].sort_values("Test AUC")
    labels = list(base.Hierarchy) + [f"GE best ({len(ge)} seeds)"]
    y = np.arange(len(base))
    gy = len(base)
    values = ev[["Train AUC", "Test AUC"]].to_numpy()
    xlim = (min(0.48, values.min() - 0.02), values.max() + 0.03)
    for split, period, marker, color in [("Train", "18 Jul - 14 Sep", "o", "grey"), ("Test", "14 Sep - 13 Oct", "D", "tab:blue")]:
        col = f"{split} AUC"
        fig, ax = plt.subplots(figsize=(8, 4.5))
        ax.scatter(base[col], y, marker=marker, color=color, label="Fixed baseline")
        ax.boxplot(ge[col], positions=[gy], vert=False, widths=0.5, showfliers=False)
        ax.scatter(ge[col], gy + np.random.default_rng(0).uniform(-0.15, 0.15, len(ge)), color="tab:red", s=18, zorder=3, label="GE best (per seed)")
        ax.axvline(0.5, color="black", lw=0.8, ls=":")
        ax.set_xlim(*xlim)
        ax.set_yticks(list(y) + [gy], labels)
        ax.set_xlabel("ROC-AUC (event-weighted over leaves with anomalies)")
        ax.set_title(f"{split} period ({period}): evolved hierarchies vs fixed baselines")
        ax.legend(loc="lower right")
        save(fig, out_dir, f"auc_vs_baselines_{split.lower()}.png")


def plot_train_vs_test(ev, out_dir):
    ge = ev[ev.Hierarchy == GE]
    base = ev[ev.Hierarchy != GE]
    fig, ax = plt.subplots(figsize=(6, 5.5))
    ax.plot([0.5, 0.9], [0.5, 0.9], color="black", lw=0.8, ls=":")
    ax.scatter(ge["Train AUC"], ge["Test AUC"], color="tab:red", label="GE best (per seed)")
    for _, r in ge.iterrows():
        ax.annotate(f"s{seed_of(r.Run)}", (r["Train AUC"], r["Test AUC"]), fontsize=7, xytext=(3, 3), textcoords="offset points")
    ax.scatter(base["Train AUC"], base["Test AUC"], marker="D", color="tab:blue", label="Baselines")
    for _, r in base.iterrows():
        ax.annotate(r.Hierarchy, (r["Train AUC"], r["Test AUC"]), fontsize=7, xytext=(3, -9), textcoords="offset points")
    ax.set_xlabel("Train AUC (Jul 18 - Sep 14)")
    ax.set_ylabel("Test AUC (Sep 14 - Oct 13)")
    ax.set_title("Generalisation: points below the diagonal lose AUC on test")
    ax.legend(loc="upper left")
    save(fig, out_dir, "train_vs_test.png")


def plot_leaves_vs_auc(ev, out_dir):
    ge = ev[ev.Hierarchy == GE]
    base = ev[ev.Hierarchy != GE]
    fig, ax = plt.subplots(figsize=(7, 4.5))
    ax.scatter(ge.Leaves, ge["Test AUC"], color="tab:red", label="GE best (per seed)")
    ax.scatter(base.Leaves, base["Test AUC"], marker="D", color="tab:blue", label="Baselines")
    for _, r in base.iterrows():
        ax.annotate(r.Hierarchy, (r.Leaves, r["Test AUC"]), fontsize=7, xytext=(4, -3), textcoords="offset points")
    ax.set_xscale("log")
    ax.set_xlim(0.7, 2e4)
    ax.set_xlabel("Number of leaf series to monitor (log scale)")
    ax.set_ylabel("Test AUC")
    ax.set_title("Detection quality vs hierarchy size")
    ax.legend(loc="lower right")
    save(fig, out_dir, "leaves_vs_auc.png")


def plot_fitness_evolution(results_dir, out_dir):
    stats = [pd.read_csv(f, sep="\t") for f in sorted(glob.glob(os.path.join(results_dir, "*", "stats.tsv")))]
    fig, ax = plt.subplots(figsize=(7, 4.5))
    for s in stats:
        ax.plot(s.gen, s.best_fitness, color="tab:red", alpha=0.25, lw=1)
    gens = stats[0].gen
    ax.plot(gens, np.mean([s.best_fitness for s in stats], axis=0), color="tab:red", lw=2.2, label="Best fitness (mean of seeds)")
    ax.plot(gens, np.mean([s.ave_fitness for s in stats], axis=0), color="tab:grey", lw=2, ls="--", label="Population average (mean of seeds)")
    ax.set_xlabel("Generation")
    ax.set_ylabel("Training fitness (weighted AUC)")
    ax.set_title(f"Fitness evolution over {len(stats)} seeds")
    ax.legend(loc="lower right")
    save(fig, out_dir, "fitness_evolution.png")
    return stats


def mark_anomalies(ax, ts, events, labels):
    hours = labels > 0
    for t in ts[hours]:
        ax.axvline(t, color="tab:orange", lw=1.5, alpha=0.5)
    ax.scatter(ts[hours], events[hours], color="tab:orange", s=25, zorder=3)


def plot_leaf_panel(ax, leaf, title):
    ts = pd.to_datetime(leaf.TIMESTAMP).to_numpy()
    ax.plot(ts, leaf["#Events"], color="tab:blue", lw=0.8)
    mark_anomalies(ax, ts, leaf["#Events"].to_numpy(), leaf.Anomaly.to_numpy())
    scored = leaf_scores(leaf, M)
    if scored is not None:
        ax2 = ax.twinx()
        ax2.plot(ts[M:], scored[1], color="tab:red", lw=0.7, alpha=0.8)
        ax2.set_ylim(0, 1.05)
        ax2.set_ylabel("MP score", color="tab:red", fontsize=8)
    ax.set_ylabel("#Events", color="tab:blue", fontsize=8)
    ax.set_title(title, fontsize=9)


def describe(conditions):
    return " / ".join(f"{k}={v}" for k, v in conditions.items()) or "All traffic"


def plot_ts_examples(hierarchy, aggregated, out_dir, test):
    aucs = {name: calculate_AUC(df) for name, df in aggregated.items()
            if not df.empty and df.Anomaly[M:].nunique() >= 2}
    ranked = sorted(aucs, key=aucs.get)
    picks = [("best", ranked[-1]), ("median", ranked[len(ranked) // 2]), ("worst", ranked[0])]
    full = create_final_hierarchy(test, [{}], is_train=False)["leaf_1"]
    fig, axs = plt.subplots(4, 1, figsize=(10, 9.5), sharex=True)
    for ax, (tag, name) in zip(axs, picks):
        cond = hierarchy[int(name.split("_")[1]) - 1]
        plot_leaf_panel(ax, aggregated[name], f"{tag.capitalize()} leaf: {describe(cond)}  (leaf AUC {aucs[name]:.3f})")
    plot_leaf_panel(axs[3], full, f"Fully aggregated series (same period, AUC {calculate_AUC(full):.3f}): anomalies diluted")
    locator = matplotlib.dates.AutoDateLocator()
    axs[3].xaxis.set_major_locator(locator)
    axs[3].xaxis.set_major_formatter(matplotlib.dates.ConciseDateFormatter(locator))
    fig.suptitle("Test period: #Events (blue), labelled anomaly hours (orange), Matrix Profile score (red)", fontsize=10)
    save(fig, out_dir, "ts_leaf_examples.png")


def plot_pooled_vs_original(ev, pooled, out_dir):
    pt = pooled[pooled.Split == "Test"].groupby("Hierarchy", sort=False)["Pooled AUC"]
    ot = ev.groupby("Hierarchy", sort=False)["Test AUC"]
    names = list(ot.mean().sort_values().index)
    x = np.arange(len(names))
    fig, ax = plt.subplots(figsize=(10, 4.5))
    ax.bar(x - 0.2, ot.mean()[names], 0.4, yerr=ot.std()[names].fillna(0), label="Original (leaves with anomalies only)", color="tab:blue")
    ax.bar(x + 0.2, pt.mean()[names], 0.4, yerr=pt.std()[names].fillna(0), label="Pooled (all leaves, false alarms count)", color="tab:green")
    ax.axhline(0.5, color="black", lw=0.8, ls=":")
    ax.set_xticks(x, names, rotation=25, ha="right", fontsize=8)
    ax.set_ylim(0.4, 1.0)
    ax.set_ylabel("Test AUC")
    ax.set_title("Robustness check: original vs pooled scoring")
    ax.legend(loc="upper left", fontsize=8)
    save(fig, out_dir, "pooled_vs_original.png")


def mermaid_tree(hierarchy, leaf_aucs):
    lines, ids = ["graph LR", '  root["All traffic"]'], {(): "root"}
    for i, cond in enumerate(hierarchy, start=1):
        path = ()
        for k, v in cond.items():
            parent, path = ids[path], path + ((k, v),)
            if path not in ids:
                ids[path] = f"n{len(ids)}"
                lines.append(f'  {parent} --> {ids[path]}["{k} = {v}"]')
        auc = leaf_aucs.get(f"leaf_{i}")
        lines.append(f'  {ids[path]} --> L{i}(["leaf {i}: AUC {auc:.2f}"])' if auc is not None
                     else f'  {ids[path]} --> L{i}(["leaf {i}: not scored"])')
    return "\n".join(lines)


def plot_phenotype_tree(hierarchy, aucs, weights, out_dir):
    children = {(): []}
    for i, cond in enumerate(hierarchy, start=1):
        path = ()
        for kv in cond.items():
            child = path + (kv,)
            if child not in children:
                children[child] = []
                children[path].append(child)
            path = child
        children[path].append(("leaf", i))

    leaf_x = max(len(c) for c in hierarchy) + 1
    pos, next_row = {}, [0]

    def place(node):
        if node and node[0] == "leaf":
            pos[node] = (leaf_x, next_row[0])
            next_row[0] += 1
            return
        for c in children[node]:
            place(c)
        ys = [pos[c][1] for c in children[node]]
        pos[node] = (len(node), (min(ys) + max(ys)) / 2)

    place(())
    features = sorted({k for c in hierarchy for k in c})
    face = dict(zip(features, plt.get_cmap("Pastel1").colors))
    fig, ax = plt.subplots(figsize=(8, 0.3 * next_row[0] + 1.2))
    cmap, norm = plt.get_cmap("RdYlGn"), matplotlib.colors.Normalize(0, 1)
    for node, kids in children.items():
        x, y = pos[node]
        elbow = x + 0.5
        ys = [pos[c][1] for c in kids]
        ax.plot([x, elbow], [y, y], color="grey", lw=0.8)
        ax.plot([elbow, elbow], [min(ys), max(ys)], color="grey", lw=0.8)
        for c in kids:
            ax.plot([elbow, pos[c][0]], [pos[c][1]] * 2, color="grey", lw=0.8)
        k, v = node[-1] if node else ("", "All")
        ax.text(x, y, v, fontsize=8, ha="center", va="center",
                bbox=dict(boxstyle="round,pad=0.25", fc=face.get(k, "white"), ec="grey", lw=0.5))
    for (_, i), (x, y) in ((n, p) for n, p in pos.items() if n and n[0] == "leaf"):
        name = f"leaf_{i}"
        if name in aucs:
            ax.scatter(x, y, s=25 + 500 * weights[name], color=cmap(norm(aucs[name])), edgecolors="black", lw=0.5, zorder=3)
            ax.text(x + 0.2, y, f"L{i}  {aucs[name]:.2f}  (w {weights[name]:.2f})", fontsize=8, va="center")
        else:
            ax.scatter(x, y, s=25, facecolors="white", edgecolors="grey", zorder=3)
            ax.text(x + 0.2, y, f"L{i}  not scored", fontsize=8, va="center", color="grey")
    ax.set_xlim(-0.5, leaf_x + 1.6)
    ax.set_ylim(next_row[0] - 0.4, -1.6)
    ax.axis("off")
    ax.legend(handles=[matplotlib.patches.Patch(fc=face[f], ec="grey", label=f) for f in features],
              loc="upper center", ncol=len(features), fontsize=8, frameon=False, bbox_to_anchor=(0.5, 1.0))
    fig.colorbar(matplotlib.cm.ScalarMappable(norm, cmap), ax=ax, fraction=0.03, pad=0.01, shrink=0.5, label="Leaf test AUC")
    save(fig, out_dir, "phenotype_tree.png")


def leaf_table(hierarchy, aggregated):
    valid = {n: df for n, df in aggregated.items() if not df.empty and df.Anomaly[M:].nunique() >= 2}
    total = sum(df["#Events"].sum() for df in valid.values())
    rows = ["| Leaf | Filter conditions | Weight | Leaf test AUC | Anomalous hours |", "|---|---|---|---|---|"]
    aucs, weights = {}, {}
    for i, cond in enumerate(hierarchy, start=1):
        name, df = f"leaf_{i}", aggregated[f"leaf_{i}"]
        hours = int((df.Anomaly > 0).sum()) if not df.empty else 0
        if name in valid:
            aucs[name] = calculate_AUC(df)
            weights[name] = df["#Events"].sum() / total
            rows.append(f"| {i} | {describe(cond)} | {weights[name]:.3f} | {aucs[name]:.3f} | {hours} |")
        else:
            rows.append(f"| {i} | {describe(cond)} | excluded | - | {hours} |")
    return "\n".join(rows), aucs, weights


def structure_table(ev, results_dir):
    rows = ["| Seed | Leaves | Max depth | Root split | Categories used | Train AUC | Test AUC |", "|---|---|---|---|---|---|---|"]
    for _, r in ev[ev.Hierarchy == GE].sort_values("Run", key=lambda s: s.map(lambda x: int(seed_of(x)))).iterrows():
        h = pheno_to_dict(read_phenotype(os.path.join(results_dir, r.Run, "best.txt")))
        used = sorted({k for c in h for k in c})
        rows.append(f"| {seed_of(r.Run)} | {len(h)} | {max(len(c) for c in h)} | {next(iter(h[0]))} | "
                    f"{', '.join(used)} | {r['Train AUC']:.3f} | {r['Test AUC']:.3f} |")
    return "\n".join(rows)


def main(results_dir, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    ev = pd.read_csv(os.path.join(results_dir, "evaluation.csv"))
    pooled_path = os.path.join(results_dir, "evaluation_pooled.csv")

    plot_auc_vs_baselines(ev, out_dir)
    plot_train_vs_test(ev, out_dir)
    plot_leaves_vs_auc(ev, out_dir)
    plot_fitness_evolution(results_dir, out_dir)
    if os.path.exists(pooled_path):
        pooled = pd.read_csv(pooled_path)
        plot_pooled_vs_original(ev, pooled, out_dir)
        print("## Pooled metrics (test, mean over seeds for GE)\n")
        print(pooled[pooled.Split == "Test"].groupby("Hierarchy", sort=False)
              [["Leaves", "Pooled AUC", "Precision@5%", "Recall@5%", "F1@5%", "Anomaly rate"]].mean().round(3).to_markdown())

    best = ev[ev.Hierarchy == GE].sort_values("Train AUC").iloc[-1]
    print(f"\n## Best run by training AUC: seed {seed_of(best.Run)} (train {best['Train AUC']:.3f}, test {best['Test AUC']:.3f})\n")
    test = pd.read_csv(DATA + "test_set.csv")[1:].copy()
    hierarchy = pheno_to_dict(read_phenotype(os.path.join(results_dir, best.Run, "best.txt")))
    aggregated = create_final_hierarchy(test, hierarchy, is_train=False)
    table, aucs, weights = leaf_table(hierarchy, aggregated)
    print("```mermaid\n" + mermaid_tree(hierarchy, aucs) + "\n```\n")
    print(table)
    plot_phenotype_tree(hierarchy, aucs, weights, out_dir)
    plot_ts_examples(hierarchy, aggregated, out_dir, test)

    print("\n## Structure of the best hierarchy per seed\n")
    print(structure_table(ev, results_dir))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
