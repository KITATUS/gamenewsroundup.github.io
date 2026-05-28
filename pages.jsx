// pages.jsx — Page-level components for Game News Round-Up

const { useState } = React;
const {
  RumourBadge, TagChip, SourceLabel, SectionHeader,
  StoryItem, HeroStoryRow, SectionBlock, OtherNotesBlock, ArchiveRow, FeedCard,
  SECTION_DISPLAY_LABELS, CopySlackButton
} = window;

// ── HOME PAGE ──────────────────────────────────────────────────────────────────
const DateNavBar = ({ currentDate, onNavigate }) => {
  const allDates = GNRU.roundups.map((r) => r.date);
  const idx = allDates.indexOf(currentDate);
  const prevDate = idx < allDates.length - 1 ? allDates[idx + 1] : null;
  const nextDate = idx > 0 ? allDates[idx - 1] : null;
  return (
    <div className="date-nav-bar">
      <div className="date-nav-bar__inner">
        <div className="date-nav-bar__side">
          {prevDate ?
          <a href="#" className="date-nav-bar__btn" onClick={(e) => {e.preventDefault();onNavigate('home', prevDate);}}>← {GNRU.formatDateShort(prevDate)}</a> :
          <span className="date-nav-bar__ghost"></span>}
        </div>
        <span className="date-nav-bar__current">{GNRU.formatDateShort(currentDate)}</span>
        <div className="date-nav-bar__side date-nav-bar__side--right">
          {nextDate ?
          <a href="#" className="date-nav-bar__btn" onClick={(e) => {e.preventDefault();onNavigate('home', nextDate);}}>{GNRU.formatDateShort(nextDate)} →</a> :
          <span className="date-nav-bar__ghost">Latest</span>}
        </div>
      </div>
    </div>);

};

const HomePage = ({ onNavigate, date }) => {
  const roundup = (date && GNRU.getByDate(date)) || GNRU.getLatest();
  const totalStories = GNRU.getTotalStories(roundup);
  const activeSections = roundup.sections.filter((s) => s.items.length > 0);

  const regularSections = activeSections.filter(s => s.id !== 'other_notes');
  const otherNotes = activeSections.find(s => s.id === 'other_notes');

  return (
    <main className="page page--home">
      <div className="home-datebar">
        <h1 className="home-datebar__title">{roundup.title}</h1>
        <p className="home-datebar__dateline">
          <span className="home-datebar__date">{GNRU.formatDate(roundup.date)}</span>
          <span className="home-datebar__sep" aria-hidden="true">·</span>
          <span className="home-datebar__count">
            {totalStories} {totalStories === 1 ? 'story' : 'stories'}
          </span>
        </p>
      </div>
      <section
        className="section-grid-wrap"
        aria-label="Today's sections"
      >
        <div className="section-grid" style={{ '--grid-cols': regularSections.length }}>
          {regularSections.map(section => (
            <SectionBlock
              key={section.id}
              section={section}
              onNavigate={onNavigate}
              currentDate={roundup.date}
            />
          ))}
        </div>
      </section>
      {otherNotes && <OtherNotesBlock section={otherNotes} />}
      <DateNavBar currentDate={roundup.date} onNavigate={onNavigate} />
      <div className="home-feeds-strip">
        <div className="home-feeds-strip__inner">
          <a href="/feeds/rss.xml" className="home-feeds-strip__link" target="_blank" rel="noopener noreferrer">RSS →</a>
          <a href={`/api/roundups/${roundup.date}.json`} className="home-feeds-strip__link" target="_blank" rel="noopener noreferrer">JSON →</a>
          <CopySlackButton roundup={roundup} className="home-feeds-strip__link" />
        </div>
      </div>
    </main>
  );
};

// ── DAILY PAGE ─────────────────────────────────────────────────────────────────
const DailyPage = ({ date, onNavigate, tweaks }) => {
  const roundup = GNRU.getByDate(date) || GNRU.getLatest();
  const totalStories = GNRU.getTotalStories(roundup);
  const activeSections = roundup.sections.filter((s) => s.items.length > 0);
  const showTags = tweaks ? tweaks.showTags !== false : true;
  const compact = tweaks && tweaks.density === 'compact';

  const allDates = GNRU.roundups.map((r) => r.date);
  const currentIdx = allDates.indexOf(roundup.date);
  const prevDate = currentIdx < allDates.length - 1 ? allDates[currentIdx + 1] : null;
  const nextDate = currentIdx > 0 ? allDates[currentIdx - 1] : null;

  const publishedTime = new Date(roundup.published_at).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  });

  return (
    <main className="page page--daily">
      <div className="daily-inner">
        {/* Title block */}
        <header className="daily-header">
          <h1 className="home-datebar__title">{roundup.title}</h1>
          <p className="home-datebar__dateline">
            <span className="home-datebar__date">{GNRU.formatDate(roundup.date)}</span>
            <span className="home-datebar__sep" aria-hidden="true">·</span>
            <span className="home-datebar__count">
              {totalStories} {totalStories === 1 ? 'story' : 'stories'}
            </span>
            {roundup.video && roundup.video.status !== 'none' && (
              <>
                <span className="home-datebar__sep" aria-hidden="true">·</span>
                <span className="daily-header__video-badge">Video available</span>
              </>
            )}
          </p>
        </header>

        {/* Sections */}
        {roundup.sections.map((section) => {
          if (section.items.length === 0) return null;
          return (
            <section key={section.id} className={`daily-section daily-section--${section.id}`} aria-label={section.label}>
              <SectionHeader label={SECTION_DISPLAY_LABELS[section.id] || section.label} count={section.items.length} id={`section-${section.id}`} />
              <div className={`story-list ${compact ? 'story-list--compact' : ''}`}>
                {section.items.map((item) =>
                <StoryItem key={item.id} item={item} showTags={showTags} compact={compact} />
                )}
              </div>
            </section>);

        })}

        {/* Data footer */}
        <footer className="daily-footer">
          <div className="daily-footer__links">
            <a href={`/api/roundups/${roundup.date}.json`} className="daily-footer__link" target="_blank" rel="noopener noreferrer">
              JSON →
            </a>
            <a href="/feeds/rss.xml" className="daily-footer__link" target="_blank" rel="noopener noreferrer">
              RSS →
            </a>
            <CopySlackButton roundup={roundup} className="daily-footer__link" />
          </div>
          <nav className="daily-nav" aria-label="Round-up navigation">
            {prevDate ?
            <a href="#" className="daily-nav__link daily-nav__link--prev" onClick={(e) => {e.preventDefault();onNavigate('daily', prevDate);}}>
                ← {GNRU.formatDateShort(prevDate)}
              </a> :
            <span className="daily-nav__empty"></span>}
            <a href="#" className="daily-nav__home" onClick={(e) => {e.preventDefault();onNavigate('home');}}>
              Go to Latest
            </a>
            {nextDate ?
            <a href="#" className="daily-nav__link daily-nav__link--next" onClick={(e) => {e.preventDefault();onNavigate('daily', nextDate);}}>
                {GNRU.formatDateShort(nextDate)} →
              </a> :
            <span className="daily-nav__empty"></span>}
          </nav>
        </footer>
      </div>
    </main>);

};

// ── ARCHIVE PAGE ───────────────────────────────────────────────────────────────
const ArchivePage = ({ onNavigate }) => {
  const [sortAsc, setSortAsc] = useState(false);
  const published = GNRU.roundups.filter((r) => r.status === 'published');
  const grouped = GNRU.groupByMonth(published);
  const monthKeys = Object.keys(grouped).sort((a, b) =>
    sortAsc ? a.localeCompare(b) : b.localeCompare(a)
  );

  const formatMonthKey = (key) => {
    const [y, m] = key.split('-');
    return new Date(parseInt(y), parseInt(m) - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  };

  return (
    <main className="page page--archive">
      <div className="archive-inner">
        <header className="page-header page-header--row">
          <div>
            <h1 className="page-header__title">Archive</h1>
            <p className="page-header__sub">{sortAsc ? 'Oldest first.' : 'Newest first.'}</p>
          </div>
          <button
            className="archive-sort-btn"
            onClick={() => setSortAsc(v => !v)}
            aria-label={sortAsc ? 'Switch to newest first' : 'Switch to oldest first'}
          >
            {sortAsc ? '↑ Oldest first' : '↓ Newest first'}
          </button>
        </header>

        {monthKeys.map((key) => {
          const entries = sortAsc ? [...grouped[key]].reverse() : grouped[key];
          return (
            <div key={key} className="archive-month">
              <h2 className="archive-month__heading">{formatMonthKey(key)}</h2>
              <div className="archive-list">
                {entries.map((r) =>
                  <ArchiveRow key={r.id} roundup={r} onNavigate={onNavigate} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

// ── FEEDS PAGE ─────────────────────────────────────────────────────────────────
const FeedsPage = ({ onNavigate }) => {
  const [copied, setCopied] = useState(null);
  const copy = (id, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };
  const origin = (typeof location !== 'undefined' && location.origin) || 'https://gamenewsroundup.co.uk';
  const latestDate = (GNRU.getLatest() || {}).date || '';

  return (
    <main className="page page--feeds">
      <div className="feeds-inner">
        <header className="page-header">
          <h1 className="page-header__title">Feeds &amp; Data</h1>
          <p className="page-header__sub">
            Game News Round-Up is available as RSS and JSON, and any round-up can be
            copied as a Slack message. No account required.
          </p>
        </header>

        <div className="feeds-page-grid">
          {/* RSS */}
          <section className="feeds-section" aria-labelledby="feeds-rss">
            <h2 className="feeds-section__heading" id="feeds-rss">RSS Feed</h2>
            <p className="feeds-section__body">
              Subscribe to the main feed in any RSS reader. Each daily round-up
              appears as a single entry with a sectioned digest in the description.
            </p>
            <div className="feeds-endpoint-row">
              <code className="feeds-endpoint">{`${origin}/feeds/rss.xml`}</code>
              <button className="feeds-copy-btn" onClick={() => copy('rss', `${origin}/feeds/rss.xml`)}>
                {copied === 'rss' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </section>

          {/* JSON API */}
          <section className="feeds-section" aria-labelledby="feeds-json">
            <h2 className="feeds-section__heading" id="feeds-json">JSON API</h2>
            <p className="feeds-section__body">
              Every round-up is published as a static JSON file, suitable for bots,
              integrations, and data tooling.
            </p>
            <div className="feeds-endpoint-list">
              {[
              [`${origin}/api/roundups/index.json`, 'All published round-ups'],
              [`${origin}/api/roundups/latest.json`, 'Latest round-up (full payload)'],
              [`${origin}/api/roundups/${latestDate}.json`, 'Specific date']].
              map(([ep, desc]) =>
              <div key={ep} className="feeds-endpoint-row feeds-endpoint-row--stacked">
                  <div className="feeds-endpoint-desc">{desc}</div>
                  <div className="feeds-endpoint-row feeds-endpoint-row--inner">
                    <code className="feeds-endpoint">{ep}</code>
                    <button className="feeds-copy-btn" onClick={() => copy(ep, ep)}>
                      {copied === ep ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Slack */}
          <section className="feeds-section" aria-labelledby="feeds-slack">
            <h2 className="feeds-section__heading" id="feeds-slack">Slack</h2>
            <p className="feeds-section__body">
              The SLACK button on every round-up copies that day to your clipboard,
              formatted as Slack mrkdwn with bold section headers. Paste it straight
              into any channel.
            </p>
          </section>
        </div>
      </div>
    </main>);

};

// ── ABOUT PAGE ─────────────────────────────────────────────────────────────────
const AboutPage = ({ onNavigate }) =>
<main className="page page--about">
    <div className="about-inner">
      <header className="page-header">
        <h1 className="page-header__title">About</h1>
      </header>
      <div className="about-body">
        <section className="about-section">
          <h2>What Is Game News Round-Up?</h2>
          <p>
            Game News Round-Up is a daily curated digest of games-industry news.
            Each day's most important stories are gathered, structured, and published
            in a fast, readable format, without opinion, commentary, or rewriting.
          </p>
          <p>
            Every story is found, selected, written, and published by hand, with no
            AI involved at any stage.
          </p>
          <p>
            The round-up covers game announcements, platform updates, subscription
            changes, business news, and clearly-labelled rumours, with every item
            linking directly to the original reporting source.
          </p>
        </section>
        <section className="about-section">
          <h2>Editorial Model</h2>
          <p>
            Game News Round-Up is a neutral digest with a factual, concise editorial
            style, where each item tells the reader what happened and links to the
            source. Rumours are visually and structurally separated from confirmed
            news and carry a confidence label.
          </p>
        </section>
        <section className="about-section">
          <h2>Who Is It For?</h2>
          <p>
            Game developers, studio leadership, games-industry workers, and anyone who
            wants the daily picture without reading every source directly.
          </p>
        </section>
        <section className="about-section">
          <h2>Data Availability</h2>
          <p>
            Every round-up is published as a structured JSON file, with a public JSON
            API and RSS feed available as static files. No account is required to access
            them. See the <a href="#" onClick={(e) => {e.preventDefault();onNavigate('feeds');}}>Feeds &amp; Data</a> page for details.
          </p>
        </section>
        <section className="about-section">
          <h2>Sections</h2>
          <ul className="about-section-list">
            <li><strong>Game News Round-Up</strong> covers major game and platform news.</li>
            <li><strong>Free Games / Subscription</strong> covers PS Plus, Game Pass, Epic, Prime Gaming, and more.</li>
            <li><strong>Business</strong> covers financials, acquisitions, layoffs, and studio news.</li>
            <li><strong>Rumors</strong> covers unconfirmed stories with confidence labels.</li>
          </ul>
        </section>
        <section className="about-section">
          <h2>Get in Touch</h2>
          <p>
            Game News Round-Up is run by people, and we would love to hear from you.
            If you have spotted a mistake, have an idea or some feedback, or have a tip
            or scoop you think we should cover, send it our way.
          </p>
          <p>
            <a href="mailto:gnr@midaf.tech?subject=GAME%20NEWS%20ROUND-UP">
              gnr@midaf.tech
            </a>
          </p>
        </section>
        <section className="about-section about-section--dedication">
          <p className="about-dedication">
            Dedicated to Alexander <em>&ldquo;Joviex&rdquo;</em> Morano, a good friend who constantly
            pushed me to be the best game developer I could be.
          </p>
        </section>
      </div>
    </div>
  </main>;


// Export all pages to window
Object.assign(window, {
  HomePage,
  DailyPage,
  ArchivePage,
  FeedsPage,
  AboutPage
});