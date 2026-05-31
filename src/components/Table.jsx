import { useState } from 'react';
import { Link } from 'react-router-dom';
import GradeBadge from './GradeBadge';
import ExpandedRow from './ExpandedRow';

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/^university of /, '')
    .replace(/ university$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildColumns(rankLabel) {
  return [
    { key: 'name', label: 'University', sortable: true },
    { key: 'tier', label: 'Tier', sortable: true },
    { key: 'overallRank', label: 'UK Rank', sortable: true },
    { key: 'subjectRank', label: rankLabel, sortable: true },
    { key: 'entryGrades', label: 'Entry Grades', sortable: true },
    { key: 'gradProspects', label: 'Grad Prospects', sortable: true },
    { key: 'notes', label: 'Audit Status', sortable: false },
  ];
}

function SortIcon({ direction }) {
  if (!direction) return <span className="ml-1 text-slate-600">+/-</span>;
  return <span className="ml-1 text-blue-400">{direction === 'asc' ? '↑' : '↓'}</span>;
}

function rankVal(value) {
  if (value == null) return 9999;
  return typeof value === 'number' ? value : parseInt(value, 10) || 9999;
}

function gradeOrder(grade) {
  const normalized = String(grade || '').split(/\s|-/)[0];
  const tokens = normalized.match(/A\*|A|B|C|D|E/g);
  if (!tokens?.length) return 999;

  const scoreMap = { 'A*': 56, A: 48, B: 40, C: 32, D: 24, E: 16 };
  const score = tokens.reduce((total, token) => total + (scoreMap[token] || 0), 0);
  return 999 - score;
}

function compareValues(a, b, key, dir) {
  let left = a[key];
  let right = b[key];

  if (['subjectRank', 'overallRank'].includes(key)) {
    left = rankVal(left);
    right = rankVal(right);
  } else if (key === 'entryGrades') {
    left = gradeOrder(left);
    right = gradeOrder(right);
  } else if (key === 'gradProspects') {
    left = parseInt(left, 10) || 0;
    right = parseInt(right, 10) || 0;
  } else {
    left = String(left || '').toLowerCase();
    right = String(right || '').toLowerCase();
  }

  if (left < right) return dir === 'asc' ? -1 : 1;
  if (left > right) return dir === 'asc' ? 1 : -1;
  return 0;
}

export default function Table({ universities, course }) {
  const [sortKey, setSortKey] = useState('subjectRank');
  const [sortDir, setSortDir] = useState('asc');
  const [expanded, setExpanded] = useState(null);

  const columns = buildColumns(course?.rankLabel || 'Table Position');

  function handleSort(key) {
    if (!columns.find(column => column.key === key)?.sortable) return;

    if (sortKey === key) {
      setSortDir(direction => (direction === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDir('asc');
  }

  const sorted = [...universities].sort((a, b) => compareValues(a, b, sortKey, sortDir));

  function tierBadge(tier) {
    return tier === 'Red Brick' ? (
      <span className="inline-block rounded border border-indigo-700/50 bg-indigo-900/60 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-300">
        Red Brick
      </span>
    ) : (
      <span className="inline-block rounded border border-slate-600/50 bg-slate-800/60 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-300">
        One Tier Below
      </span>
    );
  }

  function rankCell(value) {
    if (value == null) return <span className="text-slate-600">-</span>;
    return <span className="font-mono text-slate-300">#{value}</span>;
  }

  function courseLink(uni) {
    if (!uni.sourceUrl) return <span className="text-slate-400 text-xs">{uni.courseName}</span>;

    return (
      <a
        href={uni.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-blue-300 hover:text-blue-200 hover:underline"
        onClick={event => event.stopPropagation()}
      >
        {uni.courseName}
      </a>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-blue-900/40">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-blue-900/50 bg-[#0a1f3a]">
              {columns.map(column => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`select-none whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-blue-300/80 ${column.sortable ? 'cursor-pointer transition-colors hover:text-blue-200' : ''}`}
                >
                  {column.label}
                  {column.sortable && <SortIcon direction={sortKey === column.key ? sortDir : null} />}
                </th>
              ))}
              <th className="w-24 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-blue-300/80">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((uni, index) => {
              const isExpanded = expanded === uni.name;
              const slug = toSlug(uni.name);

              return [
                <tr
                  key={uni.name}
                  onClick={() => setExpanded(isExpanded ? null : uni.name)}
                  className={`table-row-hover border-b border-blue-900/20 transition-colors ${index % 2 === 0 ? 'bg-[#050e1f]' : 'bg-[#07152a]'} ${isExpanded ? 'bg-blue-950/30' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-100 whitespace-nowrap">{uni.name}</div>
                    {uni.courseName && <div className="mt-1">{courseLink(uni)}</div>}
                  </td>
                  <td className="px-4 py-3">{tierBadge(uni.tier)}</td>
                  <td className="px-4 py-3 text-center">{rankCell(uni.overallRank)}</td>
                  <td className="px-4 py-3 text-center">{rankCell(uni.subjectRank)}</td>
                  <td className="px-4 py-3">
                    <GradeBadge grade={uni.entryGrades} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-blue-200">{uni.gradProspects}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 max-w-xs">{uni.notes}</td>
                  <td className="px-4 py-3 text-center" onClick={event => event.stopPropagation()}>
                    <Link
                      to={`/university/${slug}`}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-blue-600/30 bg-blue-600/15 px-2.5 py-1.5 text-[11px] font-semibold text-blue-400 transition-all hover:bg-blue-600/25 hover:text-blue-300"
                    >
                      {'More info ->'}
                    </Link>
                  </td>
                </tr>,
                isExpanded && (
                  <ExpandedRow
                    key={`${uni.name}-expanded`}
                    university={uni}
                    course={course}
                    colSpan={columns.length + 1}
                  />
                ),
              ];
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-slate-500">
                  No verified UCAS 2026 undergraduate matches for this subject area in the current comparison set.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
