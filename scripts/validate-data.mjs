import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = new URL('../src/data/', import.meta.url);
const COURSE_FILES = [
  'universities.json',
  'economics-finance.json',
  'financial-maths.json',
  'banking-finance.json',
  'actuarial.json',
  'fintech.json',
  'applied-ai.json',
  'data-science.json',
  'tech-management.json',
  'investment-banking.json',
  'venture-capital.json',
  'international-finance.json',
  'esg-finance.json',
  'finance-law.json',
  'behavioural-finance.json',
  'finance-innovation.json',
];

function fail(message) {
  throw new Error(message);
}

async function main() {
  for (const file of COURSE_FILES) {
    const fullPath = new URL(file, DATA_DIR);
    const rows = JSON.parse(await fs.readFile(fullPath, 'utf8'));
    const seen = new Set();

    rows.forEach((row, index) => {
      const label = `${file} row ${index + 1} (${row.name})`;

      if (!row.name) fail(`${label}: missing university name`);
      if (seen.has(row.name)) fail(`${label}: duplicate university`);
      seen.add(row.name);

      if (!row.courseName) fail(`${label}: missing verified courseName`);
      if (!row.sourceUrl?.startsWith('https://digital.ucas.com/explore/courses/')) {
        fail(`${label}: invalid sourceUrl`);
      }
      if (!row.cugSourceUrl?.startsWith('https://www.thecompleteuniversityguide.co.uk/universities/')) {
        fail(`${label}: invalid cugSourceUrl`);
      }
      if (!row.applicationCode) fail(`${label}: missing UCAS applicationCode`);
      if (!['exact', 'close'].includes(row.matchType)) fail(`${label}: invalid matchType`);
      if (!row.notes?.startsWith('Verified UCAS 2026')) fail(`${label}: missing audit note`);
      if (row.overallRank == null) fail(`${label}: missing overallRank`);
      if (!row.gradProspects) fail(`${label}: missing gradProspects`);
      if (!row.entryGrades) fail(`${label}: missing entryGrades`);
      if (!row.typicalOffer) fail(`${label}: missing typicalOffer`);
    });

    console.log(`${path.basename(file)}: ${rows.length} rows validated`);
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
