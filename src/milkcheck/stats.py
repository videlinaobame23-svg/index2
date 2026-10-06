"""A2 · MEMBER 2 · Summarise the deliveries for the manager

Owner (your GitHub username): @videlinaobame23-svg
Your mobile task in the swe3409-cat1 repository: M4 (api.ts + App.tsx)

Done means: python -m pytest tests/test_a2_stats.py -v   -> 4 passed,
merged into main through a pull request reviewed by a teammate.
"""
import pandas as pd


def summary_by_sector(df: pd.DataFrame) -> pd.DataFrame:
    """Return one row per sector with these columns, in this order:

        sector | deliveries | total_litres | rejection_rate
    """
    g = df.groupby("sector").agg(
        deliveries=("delivery_id", "count"),
        total_litres=("litres", "sum"),
        rejection_rate=("rejected", "mean"),
    ).reset_index()

    g["total_litres"] = g["total_litres"].round(1)
    g["rejection_rate"] = g["rejection_rate"].round(2)

    g = g.sort_values(["total_litres", "sector"], ascending=[False, True])
    return g.reset_index(drop=True)


def litres_by_day(df: pd.DataFrame) -> pd.DataFrame:
    """Return columns  date | total_litres  (litres summed per day, rounded to 1 decimal),
    sorted by date, oldest first, with .reset_index(drop=True).
    """
    g = df.groupby(df["date"].dt.date)["litres"].sum().round(1).reset_index()
    g.columns = ["date", "total_litres"]
    return g


# Note: litres_by_day already returns in date order because groupby sorts the keys.