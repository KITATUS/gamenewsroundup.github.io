// GENERATED from app.jsx by scripts/lib/compile-jsx.mjs — do not edit.
(function () {
// app.jsx — App shell, navigation, and client-side router for Game News Round-Up.
//
// Uses real PATH routing (History API), not hash fragments, so every route is a
// crawlable URL backed by a pre-rendered static HTML file (see scripts/lib/render-html.mjs).
//   /              -> home (latest round-up)
//   /YYYY-MM-DD/   -> that day
//   /archive/ /feeds/ /about/ -> those pages
// Loaded last by every generated shell; data.js + components.jsx + pages.jsx precede it.

const {
  useState,
  useEffect,
  useRef
} = React;
const {
  TweaksPanel,
  useTweaks,
  TweakSection,
  TweakColor,
  TweakRadio,
  TweakToggle
} = window;
const {
  HomePage,
  DailyPage,
  ArchivePage,
  FeedsPage,
  AboutPage
} = window;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#dd192a",
  "density": "comfortable",
  "showTags": false
} /*EDITMODE-END*/;
const accentMap = {
  "#dd192a": "red",
  "#4a9eff": "blue",
  "#4aaa5e": "green"
};

// ── Path routing ──────────────────────────────────────────────────────────────
const ROUTE_PAGES = ['archive', 'feeds', 'about'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// Day pages live at /news/entries/<date>/ (see scripts/lib/render-html.mjs).
const ENTRY_RE = /^news\/entries\/(\d{4}-\d{2}-\d{2})$/;
const parsePath = pathname => {
  const seg = (pathname || '/').replace(/^\/+|\/+$/g, '');
  if (!seg) return {
    page: 'home',
    date: null
  };
  const entry = seg.match(ENTRY_RE);
  if (entry) return {
    page: 'home',
    date: entry[1]
  };
  if (ROUTE_PAGES.includes(seg)) return {
    page: seg,
    date: null
  };
  return {
    page: 'notfound',
    date: null
  };
};

// Always trailing-slash form (matches the on-disk <route>/index.html layout and
// avoids the GitHub Pages no-slash -> slash 301 redirect).
const buildPath = (page, date) => {
  const target = page === 'daily' ? 'home' : page;
  if (target === 'home') return date ? `/news/entries/${date}/` : '/';
  return `/${target}/`;
};

// Is this pathname one of our SPA routes (not a subresource like /feeds/rss.xml,
// /api/..., or the /news/<y>/<m>/<date>.json data files)? Used by the click
// interceptor. Only /news/entries/<date> is a route; other /news/... paths are data.
const isInternalRoute = pathname => {
  const seg = (pathname || '/').replace(/^\/+|\/+$/g, '');
  if (!seg) return true;
  if (ENTRY_RE.test(seg)) return true;
  return ROUTE_PAGES.includes(seg);
};

// Legacy redirect: rewrite old links to the canonical path before React renders.
//  - hash form (#/<date>, #/archive) from very old shares/RSS, and
//  - the pre-move bare path /<date>/ (now 404 server-side; GitHub Pages serves
//    404.html which loads this shell, so we recover the route client-side).
(function redirectLegacy() {
  let path = null;
  const h = location.hash;
  if (h && h.length > 1) {
    const raw = h.replace(/^#\/?/, '').trim();
    if (!raw) path = '/';else if (DATE_RE.test(raw)) path = `/news/entries/${raw}/`;else if (ROUTE_PAGES.includes(raw)) path = `/${raw}/`;
  }
  if (!path) {
    const seg = location.pathname.replace(/^\/+|\/+$/g, '');
    if (DATE_RE.test(seg)) path = `/news/entries/${seg}/`;
  }
  if (path && path !== location.pathname) history.replaceState({}, '', path + location.search);
})();
const Nav = ({
  page,
  onNavigate
}) => {
  const links = [{
    id: 'home',
    label: 'Latest'
  }, {
    id: 'archive',
    label: 'Archive'
  }, {
    id: 'feeds',
    label: 'Feeds'
  }, {
    id: 'about',
    label: 'About'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "site-nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-nav__inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    className: "site-nav__brand",
    onClick: e => {
      e.preventDefault();
      onNavigate('home');
    }
  }, "Game News Round-Up"), /*#__PURE__*/React.createElement("div", {
    className: "site-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: buildPath(l.id),
    className: `site-nav__link ${page === l.id ? 'site-nav__link--active' : ''}`,
    onClick: e => {
      e.preventDefault();
      onNavigate(l.id);
    },
    "aria-current": page === l.id ? 'page' : undefined
  }, l.label)))));
};
const Footer = ({
  onNavigate
}) => /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
  className: "site-footer"
}, /*#__PURE__*/React.createElement("span", {
  className: "site-footer__brand"
}, "Game News Round-Up"), /*#__PURE__*/React.createElement("p", {
  className: "site-footer__disclaimer"
}, "We do not collect cookies or tracking information."), /*#__PURE__*/React.createElement("div", {
  className: "site-footer__links"
}, /*#__PURE__*/React.createElement("a", {
  href: "/feeds/",
  className: "site-footer__link",
  onClick: e => {
    e.preventDefault();
    onNavigate('feeds');
  }
}, "RSS"), /*#__PURE__*/React.createElement("a", {
  href: "/feeds/",
  className: "site-footer__link",
  onClick: e => {
    e.preventDefault();
    onNavigate('feeds');
  }
}, "JSON API"), /*#__PURE__*/React.createElement("a", {
  href: "https://linktr.ee/gamenewsroundup",
  className: "site-footer__link",
  target: "_blank",
  rel: "noopener noreferrer"
}, "LINKTREE"), /*#__PURE__*/React.createElement("a", {
  href: "/about/",
  className: "site-footer__link",
  onClick: e => {
    e.preventDefault();
    onNavigate('about');
  }
}, "ABOUT"))));
const Loading = () => /*#__PURE__*/React.createElement("main", {
  className: "page"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    padding: '4rem 1rem',
    textAlign: 'center',
    color: 'var(--text-muted, #888)'
  }
}, "Loading\u2026"));
const App = () => {
  const initial = parsePath(location.pathname);
  const [page, setPage] = useState(initial.page);
  const [dailyDate, setDailyDate] = useState(initial.date);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Boot ready if the bootstrap island already seeded the manifest (no fetch flash).
  const [ready, setReady] = useState(GNRU.hasIndex());
  const [, forceRender] = useState(0);

  // Load the index once, then the day named by the path (or the latest).
  useEffect(() => {
    GNRU.loadIndex().then(() => {
      const init = parsePath(location.pathname);
      let d = init.date || GNRU.getLatest().date;
      if (init.date && !GNRU.getByDate(init.date)) {
        d = GNRU.getLatest().date; // bad shared date -> latest
        history.replaceState({}, '', '/');
        setPage('home');
        setDailyDate(null);
      }
      return GNRU.loadDay(d);
    }).then(() => setReady(true)).catch(err => console.error('Failed to load round-up data:', err));
  }, []);

  // Navigation flows through pushState; popstate + the click interceptor sync state.
  const navigate = (to, date) => {
    const target = to === 'daily' ? 'home' : to;
    const path = buildPath(target, target === 'home' ? date || null : null);
    if (location.pathname !== path) {
      history.pushState({}, '', path);
      const p = parsePath(path);
      setPage(p.page);
      setDailyDate(p.date);
    }
    window.scrollTo({
      top: 0
    });
  };
  const navRef = useRef(navigate);
  navRef.current = navigate;

  // Keep React state in sync with the URL (Back/Forward) and intercept internal
  // route links anywhere in the document for client-side navigation.
  useEffect(() => {
    const onPop = () => {
      const {
        page,
        date
      } = parsePath(location.pathname);
      setPage(page);
      setDailyDate(date);
      window.scrollTo({
        top: 0
      });
    };
    window.addEventListener('popstate', onPop);
    const onClick = e => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
      const a = e.target.closest && e.target.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || !isInternalRoute(url.pathname)) return;
      e.preventDefault();
      const {
        page,
        date
      } = parsePath(url.pathname);
      navRef.current(page === 'notfound' ? 'home' : page, date);
    };
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // The day that Home needs fully loaded (null = latest).
  const activeDate = page === 'home' ? dailyDate || (ready ? GNRU.getLatest().date : null) : null;
  useEffect(() => {
    if (ready && activeDate && !GNRU.isDayLoaded(activeDate)) {
      GNRU.loadDay(activeDate).then(() => forceRender(n => n + 1)).catch(err => console.error(err));
    }
  }, [activeDate, ready]);
  useEffect(() => {
    document.body.dataset.accent = accentMap[tweaks.accent] || 'red';
    document.body.dataset.density = tweaks.density || 'comfortable';
    document.body.dataset.showtags = String(tweaks.showTags !== false);
  }, [tweaks]);
  const renderPage = () => {
    if (!ready) return /*#__PURE__*/React.createElement(Loading, null);
    if (activeDate && !GNRU.isDayLoaded(activeDate)) return /*#__PURE__*/React.createElement(Loading, null);
    switch (page) {
      case 'home':
        return /*#__PURE__*/React.createElement(HomePage, {
          onNavigate: navigate,
          tweaks: tweaks,
          date: dailyDate
        });
      case 'daily':
        return /*#__PURE__*/React.createElement(DailyPage, {
          onNavigate: navigate,
          tweaks: tweaks,
          date: dailyDate
        });
      case 'archive':
        return /*#__PURE__*/React.createElement(ArchivePage, {
          onNavigate: navigate
        });
      case 'feeds':
        return /*#__PURE__*/React.createElement(FeedsPage, {
          onNavigate: navigate
        });
      case 'about':
        return /*#__PURE__*/React.createElement(AboutPage, {
          onNavigate: navigate
        });
      default:
        return /*#__PURE__*/React.createElement(HomePage, {
          onNavigate: navigate,
          tweaks: tweaks
        });
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    page: page,
    onNavigate: navigate
  }), renderPage(), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Accent Colour"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Colour",
    value: tweaks.accent,
    options: ['#dd192a', '#4a9eff', '#4aaa5e'],
    onChange: v => setTweak('accent', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Reading Density"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Density",
    value: tweaks.density,
    options: [{
      value: 'comfortable',
      label: 'Comfortable'
    }, {
      value: 'compact',
      label: 'Compact'
    }],
    onChange: v => setTweak('density', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Story Tags"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Show tags",
    value: tweaks.showTags !== false,
    onChange: v => setTweak('showTags', v)
  }))));
};
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
