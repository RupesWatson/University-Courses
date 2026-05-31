import GradeBadge from './GradeBadge';

function LinkValue({ href, children }) {
  if (!href) return <span>{children}</span>;

  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200 hover:underline">
      {children}
    </a>
  );
}

export default function ExpandedRow({ university, course, colSpan }) {
  const rankLabel = course?.rankLabel || 'Table Position';
  const entryGrades = university.entryGrades || university.aLevelGrades;
  const rankText = course?.rankingScope === 'official'
    ? `#${university.subjectRank} in the retained A&F ranking`
    : `#${university.subjectRank} in the current verified comparison set`;

  const fields = [
    { label: 'Verified Course', value: <LinkValue href={university.sourceUrl}>{university.courseName}</LinkValue> },
    { label: 'UCAS Code', value: university.applicationCode || 'N/A' },
    { label: 'Match Type', value: university.matchType === 'exact' ? 'Exact course title' : 'Close course variant' },
    { label: 'Typical Offer', value: university.typicalOffer },
    {
      label: rankLabel,
      value: university.subjectRank != null ? rankText : 'No current table position',
    },
    { label: 'Graduate Prospects', value: `${university.gradProspects} in graduate-level employment` },
    { label: 'Audit Status', value: university.notes },
  ];

  return (
    <tr className="bg-[#061428]">
      <td colSpan={colSpan} className="px-6 py-0">
        <div className="expand-open border-t border-blue-900/30 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fields.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">{label}</div>
                <div className="text-sm text-slate-200">{value}</div>
              </div>
            ))}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">Entry Grade</div>
              <GradeBadge grade={entryGrades} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
