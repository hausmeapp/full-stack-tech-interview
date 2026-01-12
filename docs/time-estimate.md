# Time Estimate Calculation

This document explains how to calculate the estimated time required for renovation works.

## Formula

```
estimated_days = labor_cost / daily_team_cost
```

Where:
- **labor_cost** (manodopera): The labor portion of the total renovation cost, approximately **50%** of the total cost
- **daily_team_cost** (squadra tipo): The daily cost of a standard work team, typically **€800/day**

## Example Calculation

For a renovation with:
- Total cost: €100,000
- Labor cost (50%): €50,000
- Daily team cost: €800/day

```
estimated_days = €50,000 / €800 = 62.5 days
```

## Implementation Notes

1. The `labor_cost` is already calculated by the backend and returned in the estimate breakdown
2. The candidate should:
   - Define a constant for `DAILY_TEAM_COST` (€800)
   - Add `estimated_days` to the `EstimateBreakdown` response
   - Display the time estimate in the frontend results panel

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `LABOR_COST_PERCENTAGE` | 0.50 | 50% of total cost |
| `DAILY_TEAM_COST` | €800 | Cost per day for "squadra tipo" |
