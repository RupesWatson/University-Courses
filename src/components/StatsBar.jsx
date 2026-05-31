function avgGrade(universities) {
  if (!universities.length) return '-';

  const counts = {};
  universities.forEach(university => {
    const grade = (university.entryGrades || university.aLevelGrades || '').replace(/[*]/g, '').split(' ')[0].trim();
    if (grade) counts[grade] = (counts[grade] || 0) + 1;
  });

  let best = null;
  let bestCount = 0;

  for (const [grade, count] of Object.entries(counts)) {
    if (count > bestCount) {
      best = grade;
      bestCount = count;
    }
  }

  return best || '-';
}

function topRank(universities) {
  const ranked = universities.filter(university => university.subjectRank != null);
  if (!ranked.length) return '-';

  const top = ranked.reduce((left, right) => (left.subjectRank < right.subjectRank ? left : right));
  return `${top.name.replace('University of ', '').replace(' University', '')} (#${top.subjectRank})`;
}

function topProspects(universities) {
  if (!universities.length) return '-';

  const top = universities.reduce((left, right) => (
    (parseInt(left.gradProspects, 10) > parseInt(right.gradProspects, 10)) ? left : right
  ));

  return `${top.gradProspects} - ${top.name.replace('University of ', '').replace(' University', '')}`;
}

export default function StatsBar({ universities, course }) {
  const positionLabel = course?.rankingScope === 'official' ? `Top ${course?.rankLabel || 'Rank'}` : 'Top Table Position';
  const stats = [
    { label: 'Verified Matches', value: universities.length },
    { label: 'Most Common Entry', value: avgGrade(universities) },
    { label: positionLabel, value: topRank(universities) },
    { label: 'Highest Grad Prospects', value: topProspects(universities) },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-xl border border-blue-900/50 bg-[#0a1f3a]/60 px-4 py-3 backdrop-blur-sm">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-blue-400/70">{label}</div>
          <div className="text-sm font-semibold leading-tight text-blue-100">{value}</div>
        </div>
      ))}
    </div>
  );
}
