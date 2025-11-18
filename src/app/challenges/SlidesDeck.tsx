'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';

type ChallengeTrack = {
  title: string;
  stack: string[];
  pitch: string;
  focus: string[];
  experience: string;
  tooling: string;
  category: 'Stack' | 'Workflow';
  tip: string;
};

type Slide = {
  id: string;
  label: string;
  content: ReactNode;
  highlight?: string;
};

const reactRules = `# React Rules
- Calculate during render - Don't use Effects to derive state from props/state
- Use useMemo for expensive calculations - Cache slow computations with useMemo, not Effect + setState
- Reset state with keys - Pass a unique key prop to reset component state, not Effects that watch prop changes
- Handle user events in handlers - Put interaction logic in event handlers; use Effects only for external system synchronization
- Avoid Effect chains - Don't chain Effects that trigger each other; calculate in render or handle in single event handler
- Lift state up - Pass data down from parent to child, not up via Effects
- Use useSyncExternalStore - Subscribe to external stores with the proper hook, not manual Effects
- Add cleanup to data fetching - Implement cleanup functions to prevent race conditions when fetching in Effects
- Never use localStorage/sessionStorage in artifacts - These browser storage APIs fail in sandboxed environments; use in-memory state (useState/useReducer) instead
- Stale closures in async operations - In useEffect/setTimeout/intervals, always use functional state updates setState(prev => prev + 1) not setState(count + 1) to avoid capturing stale values
- Missing dependencies cause silent bugs - Trust exhaustive-deps ESLint rule completely
- useRef for latest values in closures - When callbacks need current state but shouldn't re-run on state changes, store latest value in ref
- Dependency array functions must be memoized - Functions in deps arrays need useCallback`;

const tsRules = `# Typescript Rules
- Prefer discriminated unions over boolean flags - Instead of {isLoading: boolean, data?: T, error?: Error}, use {status: 'loading'} | {status: 'success', data: T} | {status: 'error', error: Error}
- Use unknown not any for unpredictable types - any disables type checking and spreads unsafety; unknown requires narrowing before use
- Non-null assertions (!) are dangerous - Prefer optional chaining ?. or nullish coalescing ?? over ! operator
- Type assertions lose information - as number discards original type; use non-null assertion ! when you only need to remove null/undefined to preserve the base type
- Add exhaustive checks with never - In switch statements on discriminated unions, add default: const _exhaustive: never = value to catch unhandled cases at compile time
- Generic component event handlers lose type inference - In polymorphic components with as prop, event handler parameters become any; manually type them or restructure`;

const CopyBlock = ({ title, content }: { title: string; content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  return (
    <div className="group relative flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/50 p-4 transition hover:border-white/20">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
          {title}
        </h3>
        <button
          onClick={handleCopy}
          className={`rounded-lg px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
      <pre className="max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-black/20 p-3 font-mono text-[0.65rem] leading-relaxed text-slate-400 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {content}
      </pre>
    </div>
  );
};

const hosts = [
  {
    name: 'Jethro',
    headline: 'Zero to Coder founder • Product Systems',
    bio: 'Runs the Zero to Coder workshop and community.',
  },
  {
    name: 'Iris',
    headline: 'Vibe Coders co-host • Creative Engineer',
    bio: '​Iris & Noam run the Vibe Coders community and are building tools and infrastructure for vibe coders at Differ.',
  },
];

const challengeTracks: ChallengeTrack[] = [
  {
    title: 'Vibe Link-in-Bio',
    stack: ['Next.js', 'Supabase', 'Tailwind'],
    pitch:
      'Build your own "Linktree" clone. Fetch your social links from Supabase and style them with glassmorphism.',
    experience: 'Level 1 · The Essentials',
    tooling: 'Standard Next.js setup',
    category: 'Stack',
    tip: 'Tip: Create a `links` table with `label` and `url`. Fetch it in a Server Component for speed.',
    focus: [
      'Fetch data in a Server Component (no useEffect!)',
      'Map over links to render distinct buttons',
      'Deploy to Vercel and share the URL',
    ],
  },
  {
    title: 'Live Guestbook',
    stack: ['Supabase Realtime', 'Next.js'],
    pitch:
      'A chat-like guestbook where new messages pop up instantly for everyone without refreshing.',
    experience: 'Level 2 · Realtime Magic',
    tooling: 'Supabase subscribe()',
    category: 'Workflow',
    tip: 'Tip: Enable "Realtime" on your `guestbook` table in the Supabase Dashboard (Database > Replication).',
    focus: [
      'Listen for `INSERT` events on the client side',
      'Update your local list when new messages arrive',
      'Use Optimistic UI to show your own messages instantly',
    ],
  },
  {
    title: 'Meme Stash Gallery',
    stack: ['Supabase Storage', 'Next.js Image'],
    pitch:
      'Allow visitors to upload their favorite memes to a public gallery grid.',
    experience: 'Level 3 · File Handling',
    tooling: 'Supabase JS SDK storage',
    category: 'Stack',
    tip: 'Tip: Create a public bucket named `memes`. Add an RLS policy to allow "Anyone" to select and insert.',
    focus: [
      'Build a file picker using `<input type="file" />`',
      'Upload files to the Storage bucket',
      'Display images using the optimized `next/image` component',
    ],
  },
  {
    title: 'Daily Vibe Logger',
    stack: ['GitHub Actions', 'Supabase'],
    pitch:
      'Automate a script to log the weather or a "Vibe Score" to your database every morning.',
    experience: 'Level 4 · Automation',
    tooling: 'GitHub Actions (.yml)',
    category: 'Workflow',
    tip: 'Tip: Use a GitHub Action with a `schedule: - cron: ...` trigger. Use `curl` or a script to hit your DB.',
    focus: [
      'Write a basic cron expression (e.g. every day at 9am)',
      'Store your Supabase keys in GitHub Repo Secrets',
      'Debug the automation from the Actions tab',
    ],
  },
  {
    title: 'API Mashup Dashboard',
    stack: ['Public APIs', 'Supabase', 'Fetch'],
    pitch:
      'Pull data from a fun public API (NASA, Pokémon, Star Wars) and save favorites to your DB.',
    experience: 'Level 5 · Data Integration',
    tooling: 'fetch() & async/await',
    category: 'Stack',
    tip: 'Tip: Find a free JSON API. Fetch the data on the server, then allow users to "heart" items to Supabase.',
    focus: [
      'Combine data from an external API and your database',
      'Handle loading states and API errors gracefully',
      'Create a relationship between your users and external IDs',
    ],
  },
  {
    title: 'Dynamic Social Cards',
    stack: ['Vercel OG', 'Next.js'],
    pitch:
      'Automatically generate "Open Graph" images for your social media links based on the page title.',
    experience: 'Level 6 · Social Polish',
    tooling: '@vercel/og library',
    category: 'Workflow',
    tip: 'Tip: Install `@vercel/og`. Create an API route that uses `ImageResponse` to draw JSX as an image.',
    focus: [
      'Design a card using standard CSS-in-JS',
      'Pass dynamic text via URL search params',
      'Test your card using the Vercel OG Playground',
    ],
  },
];

const ChallengeCard = ({ challenge }: { challenge: ChallengeTrack }) => (
  <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm shadow-lg shadow-violet-900/10 backdrop-blur">
    <div className="flex flex-wrap items-center justify-between gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-300">
      <span>{challenge.experience}</span>
      <span className={challenge.category === 'Stack' ? 'text-cyan-300' : 'text-emerald-300'}>
        {challenge.category}
      </span>
    </div>
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
      {challenge.tooling}
    </p>
    <div>
      <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
      <p className="mt-1 text-xs font-semibold text-cyan-200">
        {challenge.stack.join(' • ')}
      </p>
    </div>
    <p className="flex-1 text-slate-100">{challenge.pitch}</p>
    <div className="space-y-2 text-slate-200">
      {challenge.focus.map((focusItem) => (
        <div
          key={focusItem}
          className="flex items-start gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2"
        >
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
          <p>{focusItem}</p>
        </div>
      ))}
    </div>
    <p className="rounded-xl border border-dashed border-white/15 bg-white/5 px-3 py-2 text-[0.75rem] text-slate-200">
      {challenge.tip}
    </p>
  </article>
);

const CompactChallengeCard = ({ challenge }: { challenge: ChallengeTrack }) => (
  <article className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-xs shadow-lg shadow-violet-900/10 backdrop-blur">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-white">{challenge.title}</h3>
      <span className="text-[0.6rem] uppercase tracking-wider text-emerald-300">
        {challenge.experience.split(' · ')[0]}
      </span>
    </div>
    <p className="text-[0.65rem] text-cyan-200">{challenge.stack.join(' • ')}</p>
    <p className="line-clamp-2 flex-1 text-slate-300">{challenge.pitch}</p>
  </article>
);

const slides: Slide[] = [
  {
    id: 'welcome',
    label: 'Slide 01 — Welcome',
    highlight: 'Zero to Coder + Vibe Coders Community Social + Hack Night',
    content: (
      <section className="space-y-6">
        <p className="max-w-3xl text-lg text-slate-300 sm:text-xl">
          Tonight we co-build, swap stacks and workflows, and push past what Vercel + Supabase already
          make simple.
        </p>
      </section>
    ),
  },
  {
    id: 'hosts',
    label: 'Slide 02 — Hosts',
    highlight: 'Jethro ↘ Iris — Your vibe stewards',
    content: (
      <section className="space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          {hosts.map((host) => (
            <article
              key={host.name}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{host.name}</h3>
                <span className="text-xs uppercase tracking-[0.4em] text-emerald-300">intro</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-300">{host.headline}</p>
              <p className="mt-4 text-base text-slate-200">{host.bio}</p>
            </article>
          ))}
        </div>
      </section>
    ),
  },
  {
    id: 'rules',
    label: 'Slide 03 — Cursor Rules',
    highlight: 'Add these to your Cursor Rules for better AI assists',
    content: (
      <section className="grid gap-6 md:grid-cols-2">
        <CopyBlock title="React Rules" content={reactRules} />
        <CopyBlock title="TypeScript Rules" content={tsRules} />
      </section>
    ),
  },
  {
    id: 'challenges-easy',
    label: 'Slide 04 — Level 1 & 2',
    highlight: 'Easy: The Essentials + Realtime',
    content: (
      <section className="space-y-8">
        <p className="text-base text-slate-300">
          Start strong with a portfolio piece and a taste of realtime magic.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {challengeTracks.slice(0, 2).map((challenge) => (
            <ChallengeCard key={challenge.title} challenge={challenge} />
          ))}
        </div>
      </section>
    ),
  },
  {
    id: 'challenges-medium',
    label: 'Slide 05 — Level 3 & 4',
    highlight: 'Medium: Files + Automation',
    content: (
      <section className="space-y-8">
        <p className="text-base text-slate-300">
          Level up by handling file uploads and automating background tasks.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {challengeTracks.slice(2, 4).map((challenge) => (
            <ChallengeCard key={challenge.title} challenge={challenge} />
          ))}
        </div>
      </section>
    ),
  },
  {
    id: 'challenges-hard',
    label: 'Slide 06 — Level 5 & 6',
    highlight: 'Hard: Integrations + Polish',
    content: (
      <section className="space-y-8">
        <p className="text-base text-slate-300">
          Stretch your skills by mashing up APIs and generating dynamic social images.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {challengeTracks.slice(4, 6).map((challenge) => (
            <ChallengeCard key={challenge.title} challenge={challenge} />
          ))}
        </div>
      </section>
    ),
  },
  {
    id: 'all-challenges',
    label: 'Slide 07 — All Challenges',
    highlight: 'Choose your adventure',
    content: (
      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challengeTracks.map((challenge) => (
            <CompactChallengeCard key={challenge.title} challenge={challenge} />
          ))}
        </div>
      </section>
    ),
  },
];

export default function SlidesDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const totalSlides = slides.length;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const onActivity = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 1000);
    };

    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('click', onActivity);

    timeout = setTimeout(() => setShowControls(false), 1000);

    return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('click', onActivity);
      clearTimeout(timeout);
    };
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNext();
      }
      if (event.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const slide = slides[activeIndex];

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(circle_at_80%_0,rgba(14,165,233,0.3),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.25),transparent_55%)]" />
      <div className="relative z-10 flex w-full max-w-5xl flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-950/70 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="text-xs font-semibold uppercase tracking-[0.5em] text-cyan-300">
          {slide.label}
        </div>
        {slide.highlight && (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            {slide.highlight}
          </p>
        )}
        {slide.content}
      </div>
      <div
        className={`absolute inset-x-0 bottom-10 z-20 mx-auto flex w-full max-w-4xl items-center justify-between px-6 text-sm text-slate-300 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={goToPrev}
          disabled={activeIndex === 0}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Prev
        </button>
        <div className="flex items-center gap-4">
          <div className="h-px w-32 bg-gradient-to-r from-white/20 via-white to-white/20" />
          <p className="text-base font-semibold text-white">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </p>
          <div className="h-px w-32 bg-gradient-to-l from-white/20 via-white to-white/20" />
        </div>
        <button
          type="button"
          onClick={goToNext}
          disabled={activeIndex === totalSlides - 1}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </main>
  );
}

