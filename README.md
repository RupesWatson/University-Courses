# University Courses

This app compares finance-related undergraduate courses across a selected set of UK universities.

## Run locally

1. `npm install`
2. `npm run dev`
3. Open the local address shown in the terminal, usually `http://localhost:5173`

## Data audit

Course availability and course titles were audited on 2026-05-31.

- Exact course titles now come from UCAS 2026 undergraduate listings.
- Each row stores a direct UCAS source link and the UCAS application code.
- Retained rows also refresh `overallRank` and `gradProspects` from current Complete University Guide 2026 university pages.
- Retained rows also refresh `entryGrades` and `typicalOffer` from UCAS A-level offer data.
- Universities were removed from a course table when there was no verified undergraduate match for that subject area.
- Subject areas with zero current verified matches are now hidden from the selector.

## Important caveats

- `Accounting & Finance` keeps its existing A&F rank as the only retained official ranking table.
- Other course tables now use table position within the verified comparison set, not an official national subject ranking.
- Some supporting copy in the course-detail pages still comes from the legacy project dataset and has not been re-audited line by line.

## Utility scripts

- `npm run sync:ucas`
  Refreshes the course tables from UCAS 2026 using the current matching rules.
- `npm run validate:data`
  Checks that every kept row has a verified course title, UCAS code, source URL, and audit status.
