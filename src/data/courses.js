import afRawData from './universities.json';
import econFinData from './economics-finance.json';
import fintechData from './fintech.json';
import finMathData from './financial-maths.json';
import bankingData from './banking-finance.json';
import finInnData from './finance-innovation.json';
import investmentBankingData from './investment-banking.json';
import appliedAIData from './applied-ai.json';
import dataScienceData from './data-science.json';
import esgFinanceData from './esg-finance.json';
import financeLawData from './finance-law.json';
import intlFinanceData from './international-finance.json';
import actuarialData from './actuarial.json';
import ventureCapitalData from './venture-capital.json';
import techManagementData from './tech-management.json';
import behaviouralFinanceData from './behavioural-finance.json';

const afData = afRawData.map(u => ({
  ...u,
  subjectRank: u.afRank,
  entryGrades: u.aLevelGrades,
}));

export const COURSES = [
  {
    id: 'af',
    label: 'Accounting & Finance',
    rankLabel: 'A&F Rank',
    description: 'UCAS 2026 verified titles; official A&F ranking retained here',
    rankingScope: 'official',
    data: afData,
  },
  {
    id: 'econFin',
    label: 'Economics & Finance',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified course titles and close variants',
    rankingScope: 'comparison',
    data: econFinData,
  },
  {
    id: 'finMath',
    label: 'Financial Mathematics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified maths-and-finance titles',
    rankingScope: 'comparison',
    data: finMathData,
  },
  {
    id: 'banking',
    label: 'Banking & Finance',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified course titles and close variants',
    rankingScope: 'comparison',
    data: bankingData,
  },
  {
    id: 'actuarial',
    label: 'Actuarial Science',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified actuarial course titles',
    rankingScope: 'comparison',
    data: actuarialData,
  },
  {
    id: 'fintech',
    label: 'Finance & FinTech',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified FinTech course titles',
    rankingScope: 'comparison',
    data: fintechData,
  },
  {
    id: 'appliedAI',
    label: 'Finance & Applied AI',
    rankLabel: 'Table Position',
    description: 'No verified UCAS 2026 matches in the current university set',
    rankingScope: 'comparison',
    data: appliedAIData,
  },
  {
    id: 'dataScience',
    label: 'Finance & Data Science',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified data-science titles and close variants',
    rankingScope: 'comparison',
    data: dataScienceData,
  },
  {
    id: 'techManagement',
    label: 'Finance & Technology Management',
    rankLabel: 'Table Position',
    description: 'No verified UCAS 2026 matches in the current university set',
    rankingScope: 'comparison',
    data: techManagementData,
  },
  {
    id: 'investmentBanking',
    label: 'Finance & Investment Banking',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified investment-banking titles and close variants',
    rankingScope: 'comparison',
    data: investmentBankingData,
  },
  {
    id: 'ventureCapital',
    label: 'Venture Capital & Private Equity',
    rankLabel: 'Table Position',
    description: 'No verified UCAS 2026 matches in the current university set',
    rankingScope: 'comparison',
    data: ventureCapitalData,
  },
  {
    id: 'intlFinance',
    label: 'International Finance',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified international-finance variants',
    rankingScope: 'comparison',
    data: intlFinanceData,
  },
  {
    id: 'esgFinance',
    label: 'ESG & Sustainable Finance',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified sustainable-finance titles',
    rankingScope: 'comparison',
    data: esgFinanceData,
  },
  {
    id: 'financeLaw',
    label: 'Finance & Law',
    rankLabel: 'Table Position',
    description: 'No verified UCAS 2026 matches in the current university set',
    rankingScope: 'comparison',
    data: financeLawData,
  },
  {
    id: 'behaviouralFinance',
    label: 'Behavioural Finance',
    rankLabel: 'Table Position',
    description: 'No verified UCAS 2026 matches in the current university set',
    rankingScope: 'comparison',
    data: behaviouralFinanceData,
  },
  {
    id: 'finInn',
    label: 'Finance & Innovation',
    rankLabel: 'Table Position',
    description: 'No verified UCAS 2026 matches in the current university set',
    rankingScope: 'comparison',
    data: finInnData,
  },
];
