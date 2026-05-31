import { useMemo, useState } from 'react';
import { COURSES } from '../data/courses';
import StatsBar from '../components/StatsBar';
import Filters from '../components/Filters';
import CourseSelect from '../components/CourseSelect';
import Table from '../components/Table';

export default function Home() {
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState('All');
  const [courseId, setCourseId] = useState(COURSES[0].id);

  const course = COURSES.find(item => item.id === courseId) || COURSES[0];

  const filtered = useMemo(() => {
    return course.data.filter(university => {
      const matchSearch = university.name.toLowerCase().includes(search.toLowerCase());
      const matchTier = tier === 'All' || university.tier === tier;
      return matchSearch && matchTier;
    });
  }, [course, search, tier]);

  function handleCourseChange(id) {
    setCourseId(id);
    setSearch('');
    setTier('All');
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-800/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/60">
              UCAS 2026 Course Audit
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-800/40" />
          </div>
          <h1 className="mb-3 text-center font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            UK University Finance &amp;{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd, #2563eb)' }}
            >
              Business Comparison
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-center text-sm text-slate-400">
            Compare verified 2026 undergraduate course matches across the selected UK universities.
            Exact course titles now come from UCAS, and specialist tables only keep universities with a verified match.
          </p>
        </header>

        <CourseSelect selectedId={courseId} onChange={handleCourseChange} />
        <StatsBar universities={filtered} course={course} />
        <Filters search={search} setSearch={setSearch} tier={tier} setTier={setTier} />
        <Table universities={filtered} course={course} />

        <footer className="mt-10 text-center text-xs text-slate-600">
          Exact course titles and availability were checked against UCAS 2026. Only Accounting &amp; Finance keeps an official subject rank;
          all other subject tables now use table position within the verified comparison set.
        </footer>
      </div>
    </div>
  );
}
