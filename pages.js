// GENERATED from pages.jsx by scripts/lib/compile-jsx.mjs — do not edit.
(function () {
// pages.jsx — Page-level components for Game News Round-Up

const {
  useState
} = React;
const {
  RumourBadge,
  TagChip,
  SourceLabel,
  SectionHeader,
  StoryItem,
  HeroStoryRow,
  SectionBlock,
  OtherNotesBlock,
  ArchiveRow,
  FeedCard,
  SECTION_DISPLAY_LABELS,
  CopySlackButton
} = window;

// ── HOME PAGE ──────────────────────────────────────────────────────────────────
const DateNavBar = ({
  currentDate,
  onNavigate
}) => {
  const allDates = GNRU.roundups.map(r => r.date);
  const idx = allDates.indexOf(currentDate);
  const prevDate = idx < allDates.length - 1 ? allDates[idx + 1] : null;
  const nextDate = idx > 0 ? allDates[idx - 1] : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "date-nav-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "date-nav-bar__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "date-nav-bar__side"
  }, prevDate ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "date-nav-bar__btn",
    onClick: e => {
      e.preventDefault();
      onNavigate('home', prevDate);
    }
  }, "\u2190 ", GNRU.formatDateShort(prevDate)) : /*#__PURE__*/React.createElement("span", {
    className: "date-nav-bar__ghost"
  })), /*#__PURE__*/React.createElement("span", {
    className: "date-nav-bar__current"
  }, GNRU.formatDateShort(currentDate)), /*#__PURE__*/React.createElement("div", {
    className: "date-nav-bar__side date-nav-bar__side--right"
  }, nextDate ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "date-nav-bar__btn",
    onClick: e => {
      e.preventDefault();
      onNavigate('home', nextDate);
    }
  }, GNRU.formatDateShort(nextDate), " \u2192") : /*#__PURE__*/React.createElement("span", {
    className: "date-nav-bar__ghost"
  }, "Latest"))));
};
const HomePage = ({
  onNavigate,
  date
}) => {
  const roundup = date && GNRU.getByDate(date) || GNRU.getLatest();
  const totalStories = GNRU.getTotalStories(roundup);
  const activeSections = roundup.sections.filter(s => s.items.length > 0);
  const regularSections = activeSections.filter(s => s.id !== 'other_notes');
  const otherNotes = activeSections.find(s => s.id === 'other_notes');
  return /*#__PURE__*/React.createElement("main", {
    className: "page page--home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-datebar"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "home-datebar__title"
  }, roundup.title), /*#__PURE__*/React.createElement("p", {
    className: "home-datebar__dateline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__date"
  }, GNRU.formatDate(roundup.date)), /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__sep",
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__count"
  }, totalStories, " ", totalStories === 1 ? 'story' : 'stories'))), /*#__PURE__*/React.createElement("section", {
    className: "section-grid-wrap",
    "aria-label": "Today's sections"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-grid",
    style: {
      '--grid-cols': regularSections.length
    }
  }, regularSections.map(section => /*#__PURE__*/React.createElement(SectionBlock, {
    key: section.id,
    section: section,
    onNavigate: onNavigate,
    currentDate: roundup.date
  })))), otherNotes && /*#__PURE__*/React.createElement(OtherNotesBlock, {
    section: otherNotes
  }), /*#__PURE__*/React.createElement(DateNavBar, {
    currentDate: roundup.date,
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("div", {
    className: "home-feeds-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-feeds-strip__inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/feeds/rss.xml",
    className: "home-feeds-strip__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "RSS \u2192"), /*#__PURE__*/React.createElement("a", {
    href: `/api/roundups/${roundup.date}.json`,
    className: "home-feeds-strip__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "JSON \u2192"), /*#__PURE__*/React.createElement(CopySlackButton, {
    roundup: roundup,
    className: "home-feeds-strip__link"
  }), /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/@gamenewsroundup/shorts",
    className: "home-feeds-strip__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "WATCH \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "https://linktr.ee/gamenewsroundup",
    className: "home-feeds-strip__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "LISTEN \u2192"))));
};

// ── DAILY PAGE ─────────────────────────────────────────────────────────────────
const DailyPage = ({
  date,
  onNavigate,
  tweaks
}) => {
  const roundup = GNRU.getByDate(date) || GNRU.getLatest();
  const totalStories = GNRU.getTotalStories(roundup);
  const activeSections = roundup.sections.filter(s => s.items.length > 0);
  const showTags = tweaks ? tweaks.showTags !== false : true;
  const compact = tweaks && tweaks.density === 'compact';
  const allDates = GNRU.roundups.map(r => r.date);
  const currentIdx = allDates.indexOf(roundup.date);
  const prevDate = currentIdx < allDates.length - 1 ? allDates[currentIdx + 1] : null;
  const nextDate = currentIdx > 0 ? allDates[currentIdx - 1] : null;
  const publishedTime = new Date(roundup.published_at).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
  return /*#__PURE__*/React.createElement("main", {
    className: "page page--daily"
  }, /*#__PURE__*/React.createElement("div", {
    className: "daily-inner"
  }, /*#__PURE__*/React.createElement("header", {
    className: "daily-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "home-datebar__title"
  }, roundup.title), /*#__PURE__*/React.createElement("p", {
    className: "home-datebar__dateline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__date"
  }, GNRU.formatDate(roundup.date)), /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__sep",
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__count"
  }, totalStories, " ", totalStories === 1 ? 'story' : 'stories'), roundup.video && roundup.video.status !== 'none' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "home-datebar__sep",
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "daily-header__video-badge"
  }, "Video available")))), roundup.sections.map(section => {
    if (section.items.length === 0) return null;
    return /*#__PURE__*/React.createElement("section", {
      key: section.id,
      className: `daily-section daily-section--${section.id}`,
      "aria-label": section.label
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      label: SECTION_DISPLAY_LABELS[section.id] || section.label,
      count: section.items.length,
      id: `section-${section.id}`
    }), /*#__PURE__*/React.createElement("div", {
      className: `story-list ${compact ? 'story-list--compact' : ''}`
    }, section.items.map(item => /*#__PURE__*/React.createElement(StoryItem, {
      key: item.id,
      item: item,
      showTags: showTags,
      compact: compact
    }))));
  }), /*#__PURE__*/React.createElement("footer", {
    className: "daily-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "daily-footer__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: `/api/roundups/${roundup.date}.json`,
    className: "daily-footer__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "JSON \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "/feeds/rss.xml",
    className: "daily-footer__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "RSS \u2192"), /*#__PURE__*/React.createElement(CopySlackButton, {
    roundup: roundup,
    className: "daily-footer__link"
  }), /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/@gamenewsroundup/shorts",
    className: "daily-footer__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "WATCH \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "https://linktr.ee/gamenewsroundup",
    className: "daily-footer__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "LISTEN \u2192")), /*#__PURE__*/React.createElement("nav", {
    className: "daily-nav",
    "aria-label": "Round-up navigation"
  }, prevDate ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "daily-nav__link daily-nav__link--prev",
    onClick: e => {
      e.preventDefault();
      onNavigate('daily', prevDate);
    }
  }, "\u2190 ", GNRU.formatDateShort(prevDate)) : /*#__PURE__*/React.createElement("span", {
    className: "daily-nav__empty"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "daily-nav__home",
    onClick: e => {
      e.preventDefault();
      onNavigate('home');
    }
  }, "Go to Latest"), nextDate ? /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "daily-nav__link daily-nav__link--next",
    onClick: e => {
      e.preventDefault();
      onNavigate('daily', nextDate);
    }
  }, GNRU.formatDateShort(nextDate), " \u2192") : /*#__PURE__*/React.createElement("span", {
    className: "daily-nav__empty"
  })))));
};

// ── ARCHIVE PAGE ───────────────────────────────────────────────────────────────
const ArchivePage = ({
  onNavigate
}) => {
  const [sortAsc, setSortAsc] = useState(false);
  const published = GNRU.roundups.filter(r => r.status === 'published');
  const grouped = GNRU.groupByMonth(published);
  const monthKeys = Object.keys(grouped).sort((a, b) => sortAsc ? a.localeCompare(b) : b.localeCompare(a));
  const formatMonthKey = key => {
    const [y, m] = key.split('-');
    return new Date(parseInt(y), parseInt(m) - 1, 1).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    });
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "page page--archive"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-inner"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header page-header--row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "page-header__title"
  }, "Archive"), /*#__PURE__*/React.createElement("p", {
    className: "page-header__sub"
  }, sortAsc ? 'Oldest first.' : 'Newest first.')), /*#__PURE__*/React.createElement("button", {
    className: "archive-sort-btn",
    onClick: () => setSortAsc(v => !v),
    "aria-label": sortAsc ? 'Switch to newest first' : 'Switch to oldest first'
  }, sortAsc ? '↑ Oldest first' : '↓ Newest first')), monthKeys.map(key => {
    const entries = sortAsc ? [...grouped[key]].reverse() : grouped[key];
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "archive-month"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "archive-month__heading"
    }, formatMonthKey(key)), /*#__PURE__*/React.createElement("div", {
      className: "archive-list"
    }, entries.map(r => /*#__PURE__*/React.createElement(ArchiveRow, {
      key: r.id,
      roundup: r,
      onNavigate: onNavigate
    }))));
  })));
};

// ── FEEDS PAGE ─────────────────────────────────────────────────────────────────
const FeedsPage = ({
  onNavigate
}) => {
  const [copied, setCopied] = useState(null);
  const copy = (id, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };
  const origin = typeof location !== 'undefined' && location.origin || 'https://gamenewsroundup.co.uk';
  const latestDate = (GNRU.getLatest() || {}).date || '';
  return /*#__PURE__*/React.createElement("main", {
    className: "page page--feeds"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feeds-inner"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-header__title"
  }, "Feeds & Data"), /*#__PURE__*/React.createElement("p", {
    className: "page-header__sub"
  }, "Game News Round-Up is available as RSS and JSON, and any round-up can be copied as a Slack message. No account required.")), /*#__PURE__*/React.createElement("div", {
    className: "feeds-page-grid"
  }, /*#__PURE__*/React.createElement("section", {
    className: "feeds-section",
    "aria-labelledby": "feeds-rss"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "feeds-section__heading",
    id: "feeds-rss"
  }, "RSS Feed"), /*#__PURE__*/React.createElement("p", {
    className: "feeds-section__body"
  }, "Subscribe to the main feed in any RSS reader. Each daily round-up appears as a single entry with a sectioned digest in the description."), /*#__PURE__*/React.createElement("div", {
    className: "feeds-endpoint-row"
  }, /*#__PURE__*/React.createElement("code", {
    className: "feeds-endpoint"
  }, `${origin}/feeds/rss.xml`), /*#__PURE__*/React.createElement("button", {
    className: "feeds-copy-btn",
    onClick: () => copy('rss', `${origin}/feeds/rss.xml`)
  }, copied === 'rss' ? 'Copied' : 'Copy'))), /*#__PURE__*/React.createElement("section", {
    className: "feeds-section",
    "aria-labelledby": "feeds-json"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "feeds-section__heading",
    id: "feeds-json"
  }, "JSON API"), /*#__PURE__*/React.createElement("p", {
    className: "feeds-section__body"
  }, "Every round-up is published as a static JSON file, suitable for bots, integrations, and data tooling."), /*#__PURE__*/React.createElement("div", {
    className: "feeds-endpoint-list"
  }, [[`${origin}/api/roundups/index.json`, 'All published round-ups'], [`${origin}/api/roundups/latest.json`, 'Latest round-up (full payload)'], [`${origin}/api/roundups/${latestDate}.json`, 'Specific date']].map(([ep, desc]) => /*#__PURE__*/React.createElement("div", {
    key: ep,
    className: "feeds-endpoint-row feeds-endpoint-row--stacked"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feeds-endpoint-desc"
  }, desc), /*#__PURE__*/React.createElement("div", {
    className: "feeds-endpoint-row feeds-endpoint-row--inner"
  }, /*#__PURE__*/React.createElement("code", {
    className: "feeds-endpoint"
  }, ep), /*#__PURE__*/React.createElement("button", {
    className: "feeds-copy-btn",
    onClick: () => copy(ep, ep)
  }, copied === ep ? 'Copied' : 'Copy')))))), /*#__PURE__*/React.createElement("section", {
    className: "feeds-section",
    "aria-labelledby": "feeds-slack"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "feeds-section__heading",
    id: "feeds-slack"
  }, "Slack"), /*#__PURE__*/React.createElement("p", {
    className: "feeds-section__body"
  }, "The SLACK button on every round-up copies that day to your clipboard, formatted as Slack mrkdwn with bold section headers. Paste it straight into any channel.")))));
};

// ── ABOUT PAGE ─────────────────────────────────────────────────────────────────
const AboutPage = ({
  onNavigate
}) => /*#__PURE__*/React.createElement("main", {
  className: "page page--about"
}, /*#__PURE__*/React.createElement("div", {
  className: "about-inner"
}, /*#__PURE__*/React.createElement("header", {
  className: "page-header"
}, /*#__PURE__*/React.createElement("h1", {
  className: "page-header__title"
}, "About")), /*#__PURE__*/React.createElement("div", {
  className: "about-body"
}, /*#__PURE__*/React.createElement("section", {
  className: "about-section"
}, /*#__PURE__*/React.createElement("h2", null, "What Is Game News Round-Up?"), /*#__PURE__*/React.createElement("p", null, "Game News Round-Up is a daily curated digest of games-industry news. Each day's most important stories are gathered, structured, and published in a fast, readable format, without opinion, commentary, or rewriting."), /*#__PURE__*/React.createElement("p", null, "Every story is found, selected, written, and published by hand, with no AI involved at any stage."), /*#__PURE__*/React.createElement("p", null, "The round-up covers game announcements, platform updates, subscription changes, business news, and clearly-labelled rumours, with every item linking directly to the original reporting source.")), /*#__PURE__*/React.createElement("section", {
  className: "about-section"
}, /*#__PURE__*/React.createElement("h2", null, "Editorial Model"), /*#__PURE__*/React.createElement("p", null, "Game News Round-Up is a neutral digest with a factual, concise editorial style, where each item tells the reader what happened and links to the source. Rumours are visually and structurally separated from confirmed news and carry a confidence label.")), /*#__PURE__*/React.createElement("section", {
  className: "about-section"
}, /*#__PURE__*/React.createElement("h2", null, "Who Is It For?"), /*#__PURE__*/React.createElement("p", null, "Game developers, studio leadership, games-industry workers, and anyone who wants the daily picture without reading every source directly.")), /*#__PURE__*/React.createElement("section", {
  className: "about-section"
}, /*#__PURE__*/React.createElement("h2", null, "Data Availability"), /*#__PURE__*/React.createElement("p", null, "Every round-up is published as a structured JSON file, with a public JSON API and RSS feed available as static files. No account is required to access them. See the ", /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => {
    e.preventDefault();
    onNavigate('feeds');
  }
}, "Feeds & Data"), " page for details.")), /*#__PURE__*/React.createElement("section", {
  className: "about-section"
}, /*#__PURE__*/React.createElement("h2", null, "Sections"), /*#__PURE__*/React.createElement("ul", {
  className: "about-section-list"
}, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Game News Round-Up"), " covers major game and platform news."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Free Games / Subscription"), " covers PS Plus, Game Pass, Epic, Prime Gaming, and more."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Business"), " covers financials, acquisitions, layoffs, and studio news."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Rumors"), " covers unconfirmed stories with confidence labels."))), /*#__PURE__*/React.createElement("section", {
  className: "about-section"
}, /*#__PURE__*/React.createElement("h2", null, "Get in Touch"), /*#__PURE__*/React.createElement("p", null, "Game News Round-Up is run by people, and we would love to hear from you. If you have spotted a mistake, have an idea or some feedback, or have a tip or scoop you think we should cover, send it our way."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
  href: "mailto:gnr@midaf.tech?subject=GAME%20NEWS%20ROUND-UP"
}, "gnr@midaf.tech"))), /*#__PURE__*/React.createElement("section", {
  className: "about-section about-section--dedication"
}, /*#__PURE__*/React.createElement("p", {
  className: "about-dedication"
}, "Dedicated to Alexander ", /*#__PURE__*/React.createElement("em", null, "\u201CJoviex\u201D"), " Morano, a good friend who constantly pushed me to be the best game developer I could be.")))));

// Export all pages to window
Object.assign(window, {
  HomePage,
  DailyPage,
  ArchivePage,
  FeedsPage,
  AboutPage
});
})();
