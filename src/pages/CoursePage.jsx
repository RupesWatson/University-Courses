import { Link, useParams } from 'react-router-dom';
import courseDetails from '../data/course-details.json';
import { COURSES } from '../data/courses';

function Section({ title, children }) {
  return (
    <div className="mb-5 rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40 p-6">
      <h2 className="mb-4 border-b border-blue-900/40 pb-3 font-display text-xl font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

function Pill({ text, color = 'blue' }) {
  const colors = {
    blue: 'border-blue-700/40 bg-blue-900/40 text-blue-300',
    indigo: 'border-indigo-700/40 bg-indigo-900/40 text-indigo-300',
    emerald: 'border-emerald-700/40 bg-emerald-900/40 text-emerald-300',
    amber: 'border-amber-700/40 bg-amber-900/40 text-amber-300',
    purple: 'border-purple-700/40 bg-purple-900/40 text-purple-300',
  };

  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${colors[color]}`}>
      {text}
    </span>
  );
}

const DEMAND_COLOR = {
  'Very High': 'emerald',
  High: 'blue',
  Growing: 'indigo',
};

export default function CoursePage() {
  const { courseId } = useParams();
  const course = courseDetails[courseId];
  const courseMeta = COURSES.find(item => item.id === courseId);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#050e1f' }}>
        <div className="text-center">
          <div className="mb-4 text-slate-400">Course details not found.</div>
          <Link to="/" className="text-blue-400 underline hover:text-blue-300">
            {'<- Back to comparison'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300">
          <span>{'<-'}</span> Back to comparison
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex flex-wrap gap-2">
            <Pill text={course.duration} color="blue" />
            {courseMeta?.description && <Pill text={courseMeta.description} color="indigo" />}
          </div>
          <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">{course.title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">{course.overview}</p>
        </div>

        <Section title="What You'll Study">
          <div className="space-y-5">
            {course.yearByYear?.map(year => (
              <div key={year.year}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-600/20 text-sm font-bold text-blue-300">
                    {year.year}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100">Year {year.year}</div>
                    <div className="text-xs text-blue-400/70">{year.focus}</div>
                  </div>
                </div>
                <div className="ml-11 flex flex-wrap gap-2">
                  {year.modules?.map(module => (
                    <span
                      key={module}
                      className="rounded border border-blue-900/30 bg-[#050e1f]/60 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {course.skills && (
            <div className="mt-6">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
                Skills you'll develop
              </div>
              <div className="flex flex-wrap gap-2">
                {course.skills.map(skill => (
                  <Pill key={skill} text={skill} color="indigo" />
                ))}
              </div>
            </div>
          )}
        </Section>

        <Section title="Career Paths">
          <div className="mb-5 space-y-3">
            {course.careers?.map(career => (
              <div
                key={career.role}
                className="flex flex-col gap-2 rounded-lg border border-blue-900/30 bg-[#050e1f]/60 p-3 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-100">{career.role}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{career.salary}</div>
                </div>
                <Pill text={career.demand} color={DEMAND_COLOR[career.demand] || 'blue'} />
              </div>
            ))}
          </div>
          {course.furtherStudy && (
            <div className="rounded-lg border border-blue-800/40 bg-blue-900/20 p-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
                Further study options
              </div>
              <div className="text-sm text-slate-300">{course.furtherStudy}</div>
            </div>
          )}
        </Section>

        <Section title="Who Recruits from This Degree">
          <p className="mb-5 text-sm leading-relaxed text-slate-300">{course.employerPerspective}</p>
          <div className="flex flex-wrap gap-2">
            {course.topEmployers?.map(employer => (
              <Pill key={employer} text={employer} color="emerald" />
            ))}
          </div>
        </Section>

        {course.professionalBodies?.length > 0 && (
          <Section title="Professional Accreditations & Exemptions">
            <div className="space-y-3">
              {course.professionalBodies.map(body => (
                <div key={body.name} className="flex items-start gap-4 rounded-lg border border-blue-900/30 bg-[#050e1f]/60 p-3">
                  <div className="flex-shrink-0">
                    <Pill text={body.name} color="purple" />
                  </div>
                  <div className="text-sm text-slate-300">{body.benefit}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Entry Requirements">
          <div className="mb-4 rounded-lg border border-blue-900/30 bg-[#050e1f]/60 p-4">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
              Typical A-level requirements
            </div>
            <div className="text-sm text-slate-200">{course.entryRequirements}</div>
          </div>
          {course.isItForYou && (
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
                Is this course right for you?
              </div>
              <ul className="space-y-2">
                {course.isItForYou.map((point, index) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className={`mt-0.5 flex-shrink-0 ${index === course.isItForYou.length - 1 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {index === course.isItForYou.length - 1 ? '[!]' : '[+]'}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300">
            {'<- Back to comparison table'}
          </Link>
        </div>
      </div>
    </div>
  );
}
