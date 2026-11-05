"""Figure for the Anomaly Injection section: one peak and one drop, each shown on the
segment that received it and on the fully aggregated series over the same week.

Run from src/:
    python plot_injection_example.py <OUTPUT_DIR>
"""
import os
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

DATA = "../datasets/Mobai/train_set.csv"
EXAMPLES = [
    ("Peak", {"Traffic Type": "INT"}, "2022-09-10 08:00"),
    ("Drop", {"Event Type": "CALL FORWARD"}, "2022-08-01 21:00"),
]
HALF_WINDOW = pd.Timedelta(hours=84)


def hourly(df, conditions):
    mask = pd.Series(True, index=df.index)
    for col, val in conditions.items():
        mask &= df[col] == val
    s = df[mask].groupby("TIMESTAMP")["#Events"].sum()
    return s.reindex(pd.date_range(df.TIMESTAMP.min(), df.TIMESTAMP.max(), freq="h"), fill_value=0)


def panel(ax, series, t, title):
    week = series[t - HALF_WINDOW:t + HALF_WINDOW]
    ax.plot(week.index, week.values, color="tab:blue", lw=1.2)
    ax.axvspan(t - pd.Timedelta(minutes=30), t + pd.Timedelta(minutes=30), color="tab:red", alpha=0.2)
    ax.scatter([t], [series[t]], color="tab:red", s=40, zorder=3, label="Injected anomaly")
    ax.set_title(title, fontsize=10)
    ax.ticklabel_format(axis="y", style="sci", scilimits=(0, 0))
    ax.tick_params(axis="x", labelsize=8, rotation=30)
    ax.grid(alpha=0.3)


def main(out_dir):
    df = pd.read_csv(DATA)
    df["TIMESTAMP"] = pd.to_datetime(df.TIMESTAMP)
    total = hourly(df, {})
    fig, axes = plt.subplots(2, 2, figsize=(10, 6), sharex="col")
    for col, (kind, conditions, when) in enumerate(EXAMPLES):
        t = pd.Timestamp(when)
        segment = ", ".join(f"{k} = {v}" for k, v in conditions.items())
        panel(axes[0, col], hourly(df, conditions), t, f"{kind}: segment {segment}")
        panel(axes[1, col], total, t, f"{kind}: all traffic (same week)")
    for ax in axes[:, 0]:
        ax.set_ylabel("#Events per hour")
    axes[0, 0].legend(loc="upper left", fontsize=8)
    fig.tight_layout()
    fig.savefig(os.path.join(out_dir, "injection_example.png"), dpi=150)


if __name__ == "__main__":
    main(sys.argv[1])
