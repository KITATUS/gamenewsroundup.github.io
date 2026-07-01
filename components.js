// GENERATED from components.jsx by scripts/lib/compile-jsx.mjs — do not edit.
(function () {
// components.jsx — Shared UI primitives for Game News Round-Up

const {
  useState
} = React;

// ── Bold markdown renderer ───────────────────────────────────────────────────
const renderWithBold = text => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => i % 2 === 1 ? /*#__PURE__*/React.createElement("strong", {
    key: i
  }, part) : part);
};

// ── Bullet normaliser ────────────────────────────────────────────────────────
// A bullet is either a plain string (legacy archive) or { text, level } with a
// 0-based indent depth (authored in GNRTool). Normalise to { text, level }.
const normBullet = b => typeof b === 'string' ? {
  text: b,
  level: 0
} : {
  text: b.text || '',
  level: b.level || 0
};

// ── Rumour Badge ───────────────────────────────────────────────────────────────
const RumourBadge = ({
  status
}) => {
  const config = {
    rumour: {
      label: 'Rumour',
      cls: 'badge-rumour'
    },
    rumour_pending_sources: {
      label: 'Rumour — Pending Sources',
      cls: 'badge-rumour-pending'
    },
    rumour_verified_sources: {
      label: 'Rumour — Verified Sources',
      cls: 'badge-rumour-verified'
    }
  };
  const c = config[status] || config.rumour;
  return /*#__PURE__*/React.createElement("span", {
    className: `rumour-badge ${c.cls}`
  }, c.label);
};

// ── Tag Chip ───────────────────────────────────────────────────────────────────
const TagChip = ({
  tag
}) => /*#__PURE__*/React.createElement("span", {
  className: "tag-chip"
}, tag);

// ── Source Label ───────────────────────────────────────────────────────────────
const SourceLabel = ({
  source,
  size = 'normal'
}) => /*#__PURE__*/React.createElement("span", {
  className: `source-label source-label--${size}`
}, /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 10 10",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 8L8 2M8 2H4M8 2V6",
  stroke: "currentColor",
  strokeWidth: "1.25",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), source.name);

// ── Section Header ─────────────────────────────────────────────────────────────
const SectionHeader = ({
  label,
  count,
  id
}) => /*#__PURE__*/React.createElement("div", {
  className: "section-header",
  id: id
}, /*#__PURE__*/React.createElement("span", {
  className: "section-header__label"
}, label), /*#__PURE__*/React.createElement("span", {
  className: "section-header__divider",
  "aria-hidden": "true"
}), count != null && /*#__PURE__*/React.createElement("span", {
  className: "section-header__count"
}, count, " ", count === 1 ? 'story' : 'stories'));

// ── Story Item (full, for daily page) ─────────────────────────────────────────
const StoryItem = ({
  item,
  showTags = true,
  compact = false
}) => {
  const isRumour = item.metadata && item.metadata.story_type === 'rumour';
  const rumourStatus = item.metadata && item.metadata.rumour_status;
  return /*#__PURE__*/React.createElement("article", {
    className: `story-item ${compact ? 'story-item--compact' : ''} ${isRumour ? 'story-item--rumour' : ''}`
  }, isRumour && /*#__PURE__*/React.createElement("div", {
    className: "story-item__badges"
  }, /*#__PURE__*/React.createElement(RumourBadge, {
    status: rumourStatus
  })), /*#__PURE__*/React.createElement("h3", {
    className: "story-item__title"
  }, item.url ? /*#__PURE__*/React.createElement("a", {
    href: item.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "story-item__link"
  }, renderWithBold(item.title)) : /*#__PURE__*/React.createElement("span", {
    className: "story-item__link story-item__link--note"
  }, renderWithBold(item.title))), item.body && /*#__PURE__*/React.createElement("p", {
    className: "story-item__body"
  }, renderWithBold(item.body)), item.bullets && item.bullets.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "story-item__bullets"
  }, item.bullets.map((b, i) => {
    const {
      text,
      level
    } = normBullet(b);
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: level ? {
        marginLeft: `${level * 1.25}em`
      } : undefined
    }, text);
  })), /*#__PURE__*/React.createElement("div", {
    className: "story-item__meta"
  }, item.source && /*#__PURE__*/React.createElement(SourceLabel, {
    source: item.source
  }), showTags && item.tags && item.tags.slice(0, 3).map(tag => /*#__PURE__*/React.createElement(TagChip, {
    key: tag,
    tag: tag
  }))));
};

// ── Hero Story Row (for homepage hero) ────────────────────────────────────────
const HeroStoryRow = ({
  item,
  date,
  onNavigate
}) => {
  const isRumour = item.metadata && item.metadata.story_type === 'rumour';
  return /*#__PURE__*/React.createElement("div", {
    className: "hero-story-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-story-row__arrow",
    "aria-hidden": "true"
  }, "\u2192"), /*#__PURE__*/React.createElement("div", {
    className: "hero-story-row__content"
  }, isRumour && /*#__PURE__*/React.createElement(RumourBadge, {
    status: item.metadata.rumour_status
  }), /*#__PURE__*/React.createElement("a", {
    href: date ? `/news/entries/${date}/` : '/',
    className: "hero-story-row__title",
    onClick: e => {
      e.preventDefault();
      onNavigate('daily', date);
    }
  }, item.title), item.source && /*#__PURE__*/React.createElement(SourceLabel, {
    source: item.source,
    size: "small"
  })));
};

// ── Section Display Labels ────────────────────────────────────────────────────
const SECTION_DISPLAY_LABELS = {
  main_news: 'General',
  rumours: 'Rumors',
  other_notes: 'Other Notes',
  other_news: 'Other News',
  game_award_winners: 'Game Award Winners',
  announcement_highlights: 'Announcement Highlights'
};

// ── Slack message formatting ──────────────────────────────────────────────────
// Mirrors the old desktop tool (gnr_tool.py _to_slack): **bold** -> *bold*,
// <url> angle brackets stripped to a bare URL.
const slackify = text => (text || '').replace(/<(https?:\/\/[^>]+)>/g, '$1').replace(/\*\*/g, '*');
const RUMOUR_SLACK_LABELS = {
  rumour: 'Rumor',
  rumour_pending_sources: 'Rumor (Pending Sources)',
  rumour_verified_sources: 'Rumor (Verified Sources)'
};

// Build a Slack mrkdwn message for a fully-loaded round-up. No title/date line,
// matching the old tool: output begins at the first section header.
const formatRoundupForSlack = roundup => {
  const parts = [];
  for (const section of roundup.sections) {
    if (!section.items || section.items.length === 0) continue;
    const label = SECTION_DISPLAY_LABELS[section.id] || section.label;
    const entries = section.items.map(item => {
      const isRumour = item.metadata && item.metadata.story_type === 'rumour';
      let head = slackify(item.title);
      if (item.url) head += `: ${item.url}`;
      if (isRumour) {
        const rl = RUMOUR_SLACK_LABELS[item.metadata.rumour_status] || 'Rumor';
        head = `*${rl}:* ${head}`;
      }
      const lines = [`• ${head}`];
      if (item.body) lines.push(`      ${slackify(item.body)}`);
      if (item.bullets) item.bullets.forEach(b => {
        const {
          text,
          level
        } = normBullet(b);
        lines.push(`${'      '.repeat(level + 1)}• ${slackify(text)}`);
      });
      return lines.join('\n');
    });
    parts.push(`*${label}*\n` + entries.join('\n'));
  }
  return parts.join('\n\n');
};

// ── Copy as Slack Message button ──────────────────────────────────────────────
const CopySlackButton = ({
  roundup,
  className
}) => {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    const text = formatRoundupForSlack(roundup);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }).catch(() => {});
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: className,
    onClick: onClick
  }, copied ? 'Copied ✓' : 'SLACK →');
};

// ── Section Block (for homepage grid) ─────────────────────────────────────────
const SectionBlock = ({
  section,
  onNavigate,
  currentDate
}) => {
  const topItems = section.items;
  const displayLabel = SECTION_DISPLAY_LABELS[section.id] || section.label;
  return /*#__PURE__*/React.createElement("div", {
    className: `section-block section-block--${section.id}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-block__header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-block__label"
  }, displayLabel), /*#__PURE__*/React.createElement("span", {
    className: "section-block__count"
  }, section.items.length)), topItems.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "section-block__empty"
  }, "No items in this section today.") : /*#__PURE__*/React.createElement("ul", {
    className: "section-block__list",
    role: "list"
  }, topItems.map(item => {
    const isRumour = item.metadata && item.metadata.story_type === 'rumour';
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "section-block__item"
    }, isRumour && /*#__PURE__*/React.createElement("span", {
      className: "section-block__rumour-dot",
      title: "Rumor",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("div", {
      className: "section-block__item-body"
    }, isRumour && item.metadata.rumour_status && /*#__PURE__*/React.createElement(RumourBadge, {
      status: item.metadata.rumour_status
    }), /*#__PURE__*/React.createElement("a", {
      href: item.url,
      className: "section-block__item-link",
      target: "_blank",
      rel: "noopener noreferrer"
    }, renderWithBold(item.title)), item.body && /*#__PURE__*/React.createElement("p", {
      className: "section-block__item-body-text"
    }, renderWithBold(item.body)), item.bullets && item.bullets.length > 0 && /*#__PURE__*/React.createElement("ul", {
      className: "section-block__item-bullets"
    }, item.bullets.map((b, i) => {
      const {
        text,
        level
      } = normBullet(b);
      return /*#__PURE__*/React.createElement("li", {
        key: i,
        style: level ? {
          marginLeft: `${level * 1.25}em`
        } : undefined
      }, text);
    })), item.source && /*#__PURE__*/React.createElement("span", {
      className: "section-block__item-source"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "9",
      height: "9",
      viewBox: "0 0 10 10",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 8L8 2M8 2H4M8 2V6",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })), item.source.name)));
  })));
};

// ── Other Notes Block (full-width strip below grid) ──────────────────────────────
const OtherNotesBlock = ({
  section
}) => {
  const displayLabel = SECTION_DISPLAY_LABELS[section.id] || section.label;
  return /*#__PURE__*/React.createElement("div", {
    className: "other-notes-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "other-notes-block__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "other-notes-block__label"
  }, displayLabel), /*#__PURE__*/React.createElement("div", {
    className: "other-notes-block__items"
  }, section.items.map(item => /*#__PURE__*/React.createElement("p", {
    key: item.id,
    className: "other-notes-block__item"
  }, item.url ? /*#__PURE__*/React.createElement("a", {
    href: item.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, item.title) : item.title)))));
};

// ── Archive Row ────────────────────────────────────────────────────────────────
const ArchiveRow = ({
  roundup,
  onNavigate
}) => {
  const totalStories = GNRU.getTotalStories(roundup);
  // Archive rows render from the lightweight index entry (no full sections loaded).
  // Use the pre-computed top_titles preview; fall back to sections if present.
  let previewTitles;
  if (roundup.sections) {
    const mainSection = roundup.sections.find(s => s.id === 'main_news');
    const allItems = roundup.sections.flatMap(s => s.items);
    previewTitles = (mainSection && mainSection.items.length > 0 ? mainSection.items : allItems).slice(0, 2).map(it => it.title);
  } else {
    previewTitles = (roundup.top_titles || []).slice(0, 2);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "archive-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "archive-row__date"
  }, /*#__PURE__*/React.createElement("span", {
    className: "archive-row__day"
  }, GNRU.formatDateMed(roundup.date)), /*#__PURE__*/React.createElement("span", {
    className: "archive-row__year"
  }, roundup.date.slice(0, 4))), /*#__PURE__*/React.createElement("div", {
    className: "archive-row__main"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "archive-row__link",
    onClick: e => {
      e.preventDefault();
      onNavigate('home', roundup.date);
    }
  }, roundup.title, " \u2014 ", GNRU.formatDateShort(roundup.date)), /*#__PURE__*/React.createElement("div", {
    className: "archive-row__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "archive-row__count"
  }, totalStories, " stories")), /*#__PURE__*/React.createElement("ul", {
    className: "archive-row__preview",
    role: "list"
  }, previewTitles.map((title, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "archive-row__preview-item"
  }, renderWithBold(title))))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "archive-row__cta",
    onClick: e => {
      e.preventDefault();
      onNavigate('home', roundup.date);
    }
  }, "Read \u2192"));
};

// ── Feeds Card ─────────────────────────────────────────────────────────────────
const FeedCard = ({
  icon,
  label,
  description,
  endpoint,
  onNavigate
}) => /*#__PURE__*/React.createElement("div", {
  className: "feed-card"
}, /*#__PURE__*/React.createElement("div", {
  className: "feed-card__icon"
}, icon), /*#__PURE__*/React.createElement("div", {
  className: "feed-card__body"
}, /*#__PURE__*/React.createElement("span", {
  className: "feed-card__label"
}, label), /*#__PURE__*/React.createElement("span", {
  className: "feed-card__desc"
}, description), endpoint && /*#__PURE__*/React.createElement("code", {
  className: "feed-card__endpoint"
}, endpoint)), onNavigate && /*#__PURE__*/React.createElement("a", {
  href: "#",
  className: "feed-card__action",
  onClick: e => {
    e.preventDefault();
    onNavigate('feeds');
  }
}, "Details \u2192"));

// Export all to window
Object.assign(window, {
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
  CopySlackButton,
  formatRoundupForSlack
});
})();
