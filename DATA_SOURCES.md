# Data Sources Review

Reviewed on 2026-05-31.

## What was verified in this pass

- Undergraduate course availability
- Exact or close course title match for each university/course table entry
- UCAS application code for each retained row
- Direct per-row source link to the audited UCAS course page
- A-level offer grades for retained rows
- Current overall university rank for retained rows
- Current graduate-prospects outcome percentage for retained rows

## Primary source used

- UCAS 2026 undergraduate course search and course detail pages on `digital.ucas.com`
- Complete University Guide 2026 university profile pages on `thecompleteuniversityguide.co.uk`

## How the tables now work

- A university stays in a subject table only if a verified UCAS undergraduate course was found for that subject area.
- The app now shows the actual verified course title for each retained university.
- Rows are marked as either `exact` or `close`:
  - `exact`: the UCAS course title clearly matches the selected subject area
  - `close`: the UCAS course title is a nearby variant that still belongs in the selected subject area

## Key findings

- Several specialist categories in the original dataset were over-inclusive.
- `Finance & FinTech` now keeps only the universities with a verified FinTech-titled undergraduate course.
- Example: University of Bath was removed from `Finance & FinTech` because the audited UCAS listing is `Finance`, not a FinTech-titled course.
- Some categories currently have no verified matches in this selected university set, including `Finance & Applied AI`, `Finance & Technology Management`, `Venture Capital & Private Equity`, `Finance & Law`, `Behavioural Finance`, and `Finance & Innovation`.

## Still legacy after this pass

These areas still rely on the pre-existing project content and should not yet be treated as fully source-audited:

- Long-form course-detail copy in `course-details.json`
- Supporting university profile copy in `university-details.json`
- Non-Accounting-and-Finance table ordering, which is now comparison-set position rather than an external published ranking
