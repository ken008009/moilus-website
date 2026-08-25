import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/protocol', label: 'Protocol' },
  { href: '/token', label: 'Token' },
  { href: '/whitepaper', label: 'Whitepaper' },
];

const APP_BASE = '/official';
const usesFileRouter = window.location.protocol === 'file:';

function toPublicHref(href) {
  if (usesFileRouter || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
    return href;
  }
  if (href === APP_BASE || href.startsWith(`${APP_BASE}/`)) return href.replace(/\/+$/, '') || APP_BASE;
  if (href === '/') return APP_BASE;
  return `${APP_BASE}${href}`;
}

function fromPublicPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === APP_BASE) return '/';
  if (normalized.startsWith(`${APP_BASE}/`)) return normalized.slice(APP_BASE.length) || '/';
  return normalized;
}
const logoSrc = `${import.meta.env.BASE_URL}logo-ms.svg`;
const homeHeroVideoSrc = `${import.meta.env.BASE_URL}media/bg-ms.mp4`;
const whitepaperPdfSrc = `${import.meta.env.BASE_URL}downloads/Mobius-Strip-Whitepaper-English.pdf`;
const whitepaperCoverSrc = `${import.meta.env.BASE_URL}images/whitepaper-cover.webp`;
const imagery = {
  mining: `${import.meta.env.BASE_URL}images/crypto-mining.webp`,
  custody: `${import.meta.env.BASE_URL}images/self-custody.webp`,
  hardware: `${import.meta.env.BASE_URL}images/protocol-hardware.webp`,
  secureElement: `${import.meta.env.BASE_URL}images/secure-element.webp`,
  payments: `${import.meta.env.BASE_URL}images/payments.webp`,
  gameFi: `${import.meta.env.BASE_URL}images/texas-holdem.webp`,
  chat: `${import.meta.env.BASE_URL}images/ms-chat-lifestyle.webp`,
  dao: `${import.meta.env.BASE_URL}images/ms-dao-governance.webp`,
  growthCycle: `${import.meta.env.BASE_URL}images/market-growth-cycle.jpg`,
};

const productChapters = [
  {
    title: 'Public chain',
    copy: 'A BSC-based settlement layer designed to keep each product on one open, observable surface.',
    image: imagery.mining,
    alt: 'A real aisle of cryptocurrency mining hardware with green status lights',
  },
  {
    title: 'Governance and coordination',
    copy: 'Proposals, delegation and transparent voting designed as a native part of the system.',
    image: imagery.dao,
    alt: 'A person using the MS DAO governance platform on a mobile phone',
  },
  {
    title: 'Wallet and global payments',
    copy: 'A single interface for ownership, transfer and participation across the wider Mobius economy.',
    image: imagery.payments,
    alt: 'A contactless payment made with an unbranded metal card',
  },
];

const ecosystemItems = [
  {
    name: 'MS Chain',
    note: 'Public infrastructure',
    image: imagery.mining,
    copy: 'The base layer connects staking, governance, payments and interactive contracts through one shared state.',
  },
  {
    name: 'MS DAO',
    note: 'Governance platform',
    image: imagery.dao,
    copy: 'An on-chain governance platform for proposals, delegation and transparent collective decision-making.',
  },
  {
    name: 'MS Wallet',
    note: 'Ownership and payments',
    image: imagery.custody,
    copy: 'Self-custody and global value movement, with the wider ecosystem only one gesture away.',
  },
  {
    name: 'MS GameFi',
    note: 'Texas Hold’em',
    image: imagery.gameFi,
    copy: 'A live Texas Hold’em layer that turns digital ownership into play, progression and community.',
  },
  {
    name: 'MS Chat',
    note: 'Dark-mode messenger',
    image: imagery.chat,
    copy: 'An encrypted messenger that closes the loop between identity, coordination and on-chain action.',
  },
];

const protocolBands = [
  {
    trigger: '15% cumulative decline',
    title: 'First stabilisation band',
    copy: 'The source protocol applies 35% transaction slippage, directing it to repurchase MS and send it to the burn address.',
    metric: '−15%',
    response: '35% response',
  },
  {
    trigger: '30% cumulative decline',
    title: 'Deep stabilisation band',
    copy: 'The slippage parameter rises to 50%, maintaining the same repurchase-and-burn path described in the protocol deck.',
    metric: '−30%',
    response: '50% response',
  },
  {
    trigger: '50% cumulative decline',
    title: 'Circulation mode',
    copy: 'Existing profit-release schedules pause while new accounts and dynamic tier rewards continue. Normal operation resumes after a 48-hour recovery period.',
    metric: '−50%',
    response: '48h recovery',
  },
];

function usePathname() {
  const getCurrentPath = () => {
    if (!usesFileRouter) return fromPublicPath(window.location.pathname);
    const hashPath = window.location.hash.replace(/^#/, '');
    return hashPath.startsWith('/') ? hashPath : '/';
  };

  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const handleLocationChange = () => setPath(getCurrentPath());
    const eventName = usesFileRouter ? 'hashchange' : 'popstate';
    window.addEventListener(eventName, handleLocationChange);
    return () => window.removeEventListener(eventName, handleLocationChange);
  }, []);

  useEffect(() => {
    if (usesFileRouter) return;
    const publicHref = toPublicHref(getCurrentPath());
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    if (current !== publicHref) {
      window.history.replaceState({}, '', publicHref);
    }
  }, []);

  const navigate = (href) => {
    const appPath = fromPublicPath(href.startsWith(APP_BASE) ? href : toPublicHref(href));
    if (usesFileRouter) {
      if (appPath === getCurrentPath()) return;
      window.location.hash = appPath;
      setPath(appPath);
      return;
    }

    if (appPath === getCurrentPath()) return;
    window.history.pushState({}, '', toPublicHref(appPath));
    setPath(appPath);
  };

  return [path, navigate];
}

function AppLink({ href, navigate, className = '', children, onClick, ...rest }) {
  return (
    <a
      href={usesFileRouter ? `#${href}` : toPublicHref(href)}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        const isPrimaryActivation = (event.button ?? 0) === 0;
        if (
          event.defaultPrevented ||
          !isPrimaryActivation ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) return;
        event.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Nav({ path, navigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 1050) setOpen(false);
    };

    document.body.classList.toggle('nav-open', open);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  return (
    <header className={`site-header ${open ? 'menu-is-open' : ''}`}>
      <nav className={`nav-shell ${open ? 'menu-open' : ''}`} aria-label="Primary navigation">
        <AppLink href="/" navigate={navigate} className="brand-link" aria-label="Mobius Strip home">
          <img src={logoSrc} alt="Mobius Strip" />
        </AppLink>

        <div id="primary-menu" className={`nav-links ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              navigate={navigate}
              className={path === item.href ? 'is-active' : ''}
              aria-current={path === item.href ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </AppLink>
          ))}
        </div>

        <AppLink href="/protocol" navigate={navigate} className="nav-cta">
          Read protocol <ArrowIcon />
        </AppLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-controls="primary-menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}

function Hero({ eyebrow, title, copy, image, alt, video, primary, secondary, navigate, compact = false }) {
  return (
    <section className={`hero ${compact ? 'hero-compact' : ''} ${video ? 'hero-video' : ''}`}>
      <div className="hero-media" aria-hidden="true">
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={image}
            disablePictureInPicture
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img src={image} alt="" fetchPriority="high" />
        )}
      </div>
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-content shell">
        <p className="eyebrow hero-kicker">{eyebrow}</p>
        <h1 className="max-w-6xl w-full">{title}</h1>
        <p className="hero-copy">{copy}</p>
        <div className="hero-actions">
          <AppLink href={primary.href} navigate={navigate} className="button button-primary">
            {primary.label} <ArrowIcon />
          </AppLink>
          <AppLink href={secondary.href} navigate={navigate} className="button button-secondary">
            {secondary.label}
          </AppLink>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span />
        Scroll to enter the continuum
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['Public chain', 'On-chain governance', 'Global payments', 'Texas Hold’em', 'MS DAO', 'Encrypted chat'];
  return (
    <div className="marquee" aria-label="Mobius ecosystem products">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}<i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'is-centered' : ''} reveal`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="The continuous on-chain economy"
        title={<>One surface.<br />No boundaries.</>}
        copy="Mobius Strip connects infrastructure, governance, payments, GameFi and communication in one open, self-circulating ecosystem."
        image={imagery.mining}
        video={homeHeroVideoSrc}
        alt="A real cryptocurrency mining facility photographed at night"
        primary={{ href: '/ecosystem', label: 'Explore the ecosystem' }}
        secondary={{ href: '/protocol', label: 'See how it holds' }}
        navigate={navigate}
      />

      <Marquee />

      <section className="chapter shell">
        <SectionHeading
          eyebrow="Everything stays connected"
          title="An economy designed as one uninterrupted surface."
          copy="Every Mobius product has its own role, but none lives in isolation. Governance, ownership, play and coordination move through the same system."
        />

        <div className="bento-grid grid-flow-dense">
          <AppLink href="/ecosystem" navigate={navigate} className="bento-card bento-lead media-link group reveal">
            <img src={imagery.custody} alt="Hands operating a physical hardware wallet beside a laptop" />
            <div className="card-wash" />
            <div className="bento-content">
              <span>Five products, one state</span>
              <h3>The full ecosystem</h3>
              <ArrowIcon />
            </div>
          </AppLink>
          <AppLink href="/protocol" navigate={navigate} className="bento-card bento-small media-link group reveal">
            <img src={imagery.hardware} alt="Liquid-cooled server hardware inside a compute rack" />
            <div className="card-wash" />
            <div className="bento-content">
              <span>Rules that react</span>
              <h3>Protocol mechanics</h3>
              <ArrowIcon />
            </div>
          </AppLink>
          <AppLink href="/token" navigate={navigate} className="bento-card bento-small bento-tone group reveal">
            <div className="token-orbit" aria-hidden="true"><span>MS</span></div>
            <div className="bento-content">
              <span>Transparent allocation</span>
              <h3>One billion MS</h3>
              <ArrowIcon />
            </div>
          </AppLink>
        </div>
      </section>

      <section className="statement chapter shell reveal">
        <p>
          Value enters through an open network, moves through a living
          <span
            className="inline-image"
            role="img"
            aria-label="Luminous city detail"
            style={{ backgroundImage: `url(${imagery.payments})` }}
          />
          economy and returns with new utility.
        </p>
      </section>

      <section className="pin-layout chapter shell">
        <div className="pin-copy">
          <p className="eyebrow">Built to keep moving</p>
          <h2>One path.<br />Three layers.</h2>
          <p>Scroll through the system from infrastructure to human use. The title holds while the surface keeps moving.</p>
          <AppLink href="/ecosystem" navigate={navigate} className="text-link">
            Enter the ecosystem <ArrowIcon />
          </AppLink>
        </div>
        <div className="pin-gallery">
          {productChapters.map((item, index) => (
            <article className="gallery-card reveal" key={item.title}>
              <div className="gallery-image">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <ActionChapter
        title="The system is bigger than a token."
        copy="Follow the full product loop, then examine the mechanics that keep circulation moving."
        primary={{ href: '/ecosystem', label: 'Explore every layer' }}
        secondary={{ href: '/token', label: 'View token model' }}
        navigate={navigate}
      />
    </>
  );
}

function EcosystemPage({ navigate }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <Hero
        eyebrow="Five products. One shared state."
        title="A network that becomes an economy."
        copy="Mobius connects the rails, governance, interfaces, experiences and conversations required for an on-chain ecosystem to feel whole."
        image={imagery.custody}
        alt="Hands using a physical crypto hardware wallet at a real desk"
        primary={{ href: '/protocol', label: 'Understand the protocol' }}
        secondary={{ href: '/token', label: 'View MS economics' }}
        navigate={navigate}
        compact
      />

      <section className="chapter shell">
        <SectionHeading
          eyebrow="From rails to real use"
          title="Expand the system."
          copy="Each vertical slice is a distinct Mobius product. Click or tap a layer to open it and see how it connects."
        />
        <div className="accordion" role="list">
          {ecosystemItems.map((item, index) => (
            <button
              className={`accordion-item ${active === index ? 'is-active' : ''}`}
              type="button"
              key={item.name}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-expanded={active === index}
              aria-label={`${item.name}: ${item.note}`}
            >
              <img src={item.image} alt="" loading="lazy" />
              <div className="accordion-wash" />
              <span className="accordion-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="accordion-title">
                <small>{item.note}</small>
                <h3>{item.name}</h3>
                <p>{item.copy}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="stack-section chapter shell">
        <SectionHeading
          eyebrow="The continuous journey"
          title="Utility compounds when products connect."
          copy="The interface changes. The underlying ownership does not. These chapters stack into a single participant journey."
        />
        <div className="stack-list">
          {[
            ['Enter', 'Access Mobius through a wallet and move value onto the shared network.', imagery.payments],
            ['Participate', 'Govern, stake, play and coordinate without leaving the ecosystem surface.', imagery.gameFi],
            ['Circulate', 'Liquidity and utility return to the network rather than ending at a product boundary.', imagery.mining],
          ].map(([title, copy, image], index) => (
            <article className="stack-card" key={title} style={{ '--stack-index': index }}>
              <img src={image} alt="" loading="lazy" />
              <div className="stack-wash" />
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ActionChapter
        title="Utility is only durable when the rules are visible."
        copy="See the thresholds, release logic and circulation mode described by the Mobius protocol."
        primary={{ href: '/protocol', label: 'Open protocol mechanics' }}
        secondary={{ href: '/token', label: 'Inspect allocation' }}
        navigate={navigate}
      />
    </>
  );
}

function ProtocolPage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="A system that responds"
        title="Protection is a behavior, not a promise."
        copy="Mobius describes a sequence of on-chain responses designed to slow concentrated selling, reinforce liquidity and restart circulation."
        image={imagery.hardware}
        alt="Real liquid-cooled blockchain compute hardware"
        primary={{ href: '#thresholds', label: 'See the thresholds' }}
        secondary={{ href: '/token', label: 'View token model' }}
        navigate={(href) => {
          if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          else navigate(href);
        }}
        compact
      />

      <section className="chapter shell" id="thresholds">
        <SectionHeading
          eyebrow="Published response logic"
          title="One market cycle. Three response bands."
          copy="The supplied cycle chart shows repeated growth, correction and recovery. The response bands beside it describe intended mechanics, not guaranteed market outcomes."
        />
        <div className="protocol-cycle">
          <figure className="protocol-cycle-figure reveal">
            <img
              src={imagery.growthCycle}
              alt="Mobius Strip market growth cycle showing repeated rises, corrections and higher recovery floors"
              loading="lazy"
            />
            <figcaption>Market growth cycle / supplied protocol visual</figcaption>
          </figure>

          <div className="protocol-band-list">
            {protocolBands.map((item, index) => (
              <article className="protocol-band reveal" key={item.trigger}>
                <div className="protocol-band-topline">
                  <span>{item.trigger}</span>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </div>
                <div className="protocol-band-metric">
                  <strong>{item.metric}</strong>
                  <span>{item.response}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="protocol-editorial chapter">
        <div className="protocol-photo">
          <img src={imagery.mining} alt="Physical cryptocurrency mining machines in a real industrial facility" loading="lazy" />
        </div>
        <div className="protocol-copy reveal">
          <p className="eyebrow">Circulation mode</p>
          <h2>Pause. Protect. Recover. Resume.</h2>
          <p>
            At a 50% cumulative decline, the source model pauses existing release schedules. New accounts and dynamic differential rewards remain active. Once price recovery holds for 48 hours, normal operations resume.
          </p>
          <div className="protocol-detail">
            <span>Compensation described in source</span>
            <strong>0.02%</strong>
            <p>of paused quota during circulation mode, subject to the implemented contract terms.</p>
          </div>
        </div>
      </section>

      <section className="chapter shell">
        <SectionHeading
          eyebrow="Staking model"
          title="Clear inputs. Scheduled release."
          copy="The supplied deck presents a staking model with the following published parameters. Any live implementation should be verified on-chain before participation."
        />
        <div className="parameter-row">
          <article className="parameter-card reveal">
            <span>Minimum order</span>
            <strong>200 USDT</strong>
            <p>Entry threshold stated in the source model.</p>
          </article>
          <article className="parameter-card reveal">
            <span>Published aggregate target</span>
            <strong>300%</strong>
            <p>A model parameter, not a guaranteed return.</p>
          </article>
          <article className="parameter-card reveal">
            <span>Linear release period</span>
            <strong>365 days</strong>
            <p>Release schedule stated in the supplied deck.</p>
          </article>
        </div>
        <p className="risk-note reveal">
          Digital assets and DeFi protocols involve substantial risk. Protection mechanics can influence incentives, but cannot eliminate liquidity, smart-contract, market or loss risk.
        </p>
      </section>

      <ActionChapter
        title="Mechanics matter. Verification matters more."
        copy="Continue into supply, allocation and the staged product rollout behind MS."
        primary={{ href: '/token', label: 'Explore token economics' }}
        secondary={{ href: '/ecosystem', label: 'Return to products' }}
        navigate={navigate}
      />
    </>
  );
}

function TokenPage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="MS economic model"
        title="A fixed supply with a job to do."
        copy="The supplied model divides one billion MS between the staking settlement system and public liquidity for the wider ecosystem."
        image={imagery.secureElement}
        alt="Macro photograph of the secure element inside a hardware wallet"
        primary={{ href: '#allocation', label: 'Inspect allocation' }}
        secondary={{ href: '/ecosystem', label: 'See product utility' }}
        navigate={(href) => {
          if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          else navigate(href);
        }}
        compact
      />

      <section className="allocation chapter shell" id="allocation">
        <div className="allocation-figure reveal">
          <div className="allocation-ring" aria-label="Token allocation: 30 percent settlement reserve and 70 percent ecosystem liquidity">
            <div>
              <strong>1B</strong>
              <span>total MS</span>
            </div>
          </div>
        </div>
        <div className="allocation-copy reveal">
          <p className="eyebrow">Two connected pools</p>
          <h2>Every token enters the model with a defined role.</h2>
          <div className="allocation-item">
            <span className="allocation-swatch is-reserve" />
            <strong>300M MS</strong>
            <p>Allocated in the source model to support the staking ecosystem settlement system.</p>
          </div>
          <div className="allocation-item">
            <span className="allocation-swatch is-liquidity" />
            <strong>700M MS</strong>
            <p>Allocated to public liquidity and the card-based GameFi economy.</p>
          </div>
        </div>
      </section>

      <section className="chapter shell">
        <SectionHeading
          eyebrow="A staged launch"
          title="Build the foundation, open the market, expand the utility."
        />
        <div className="roadmap">
          {[
            ['Foundation', 'Staking launch', 'Establish the participation model and the first layer of ecosystem circulation.'],
            ['Circulation', 'MS market launch', 'Enable open trading, market liquidity and public price discovery.'],
            ['Expansion', 'Card GameFi launch', 'Bring card-based blockchain play into the ecosystem to widen utility and community.'],
          ].map(([phase, title, copy], index) => (
            <article className="roadmap-item reveal" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <small>{phase}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ActionChapter
        title="Supply defines scarcity. Utility defines relevance."
        copy="See how the products turn a fixed MS supply into movement across one connected ecosystem."
        primary={{ href: '/ecosystem', label: 'Follow the utility loop' }}
        secondary={{ href: '/protocol', label: 'Review safeguards' }}
        navigate={navigate}
      />
    </>
  );
}

function WhitepaperPage({ navigate }) {
  const whitepaperTopics = [
    ['Architecture', 'Chain design, consensus, masternodes and the proposed three-layer privacy protocol.'],
    ['Applications', 'MS Swap, Card Game, Pay, Chat and DAO across one connected product surface.'],
    ['Economics', 'Fixed supply, allocation, ecosystem fees and the published burn model.'],
    ['Security', 'Cryptography, contract, network and asset-security considerations.'],
    ['Roadmap', 'Testnet, mainnet, ecosystem expansion and the planned global rollout.'],
    ['Risk and compliance', 'Technical, market, regulatory and economic risks described by the issuing entity.'],
  ];

  return (
    <>
      <section className="whitepaper-hero">
        <div className="whitepaper-hero-grid shell">
          <div className="whitepaper-intro">
            <p className="eyebrow hero-kicker">Whitepaper, May 2026</p>
            <h1>Read the full system.</h1>
            <p className="hero-copy">
              An 18-page overview of the Mobius Strip architecture, applications, economics, roadmap and disclosed risks.
            </p>
            <div className="hero-actions">
              <a href="#whitepaper-download" className="button button-primary">
                View available file <ArrowIcon />
              </a>
            </div>
          </div>

          <figure className="whitepaper-document reveal">
            <div className="whitepaper-cover">
              <img
                src={whitepaperCoverSrc}
                alt="Cover of the Mobius Strip English whitepaper"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>English edition</span>
              <span>18 pages</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="chapter shell" id="whitepaper-download">
        <SectionHeading
          eyebrow="Available edition"
          title="Keep the source document close."
          copy="Download the supplied English edition or open it in a new browser tab for quick reference."
        />

        <article className="whitepaper-file reveal">
          <div className="whitepaper-file-copy">
            <span>PDF</span>
            <div>
              <h3>Mobius Strip whitepaper</h3>
              <p>English PDF / May 2026 / 18 pages / 589 KB</p>
            </div>
          </div>
          <div className="whitepaper-file-actions">
            <a
              href={whitepaperPdfSrc}
              className="button button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Open PDF
            </a>
            <a href={whitepaperPdfSrc} className="button button-primary" download>
              Download PDF <ArrowIcon />
            </a>
          </div>
        </article>
      </section>

      <section className="whitepaper-index chapter shell">
        <div className="whitepaper-index-intro reveal">
          <p className="eyebrow">Inside the paper</p>
          <h2>The complete system, in one document.</h2>
          <p>
            The paper presents the project as proposed by its issuing entity. Treat technical, market and regulatory claims as material to verify independently.
          </p>
        </div>
        <div className="whitepaper-topics">
          {whitepaperTopics.map(([title, copy]) => (
            <article className="whitepaper-topic reveal" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <ActionChapter
        title="From the document to the working model."
        copy="Continue through the protocol mechanics or see where each product fits inside the ecosystem."
        primary={{ href: '/protocol', label: 'Review the protocol' }}
        secondary={{ href: '/ecosystem', label: 'Explore the ecosystem' }}
        navigate={navigate}
      />
    </>
  );
}

function ActionChapter({ title, copy, primary, secondary, navigate }) {
  return (
    <section className="action-chapter chapter shell reveal">
      <div className="action-glow" aria-hidden="true" />
      <p className="eyebrow">Continue the loop</p>
      <h2>{title}</h2>
      <p>{copy}</p>
      <div className="hero-actions">
        <AppLink href={primary.href} navigate={navigate} className="button button-primary">
          {primary.label} <ArrowIcon />
        </AppLink>
        <AppLink href={secondary.href} navigate={navigate} className="button button-secondary">
          {secondary.label}
        </AppLink>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <img src={logoSrc} alt="Mobius Strip" />
        <p>One surface. No boundaries.</p>
        <div className="footer-nav">
          {navItems.map((item) => (
            <AppLink key={item.href} href={item.href} navigate={navigate}>{item.label}</AppLink>
          ))}
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>Mobius Strip is an experimental digital-asset ecosystem. Nothing on this site is financial advice or a guarantee of returns.</p>
        <span>© 2026 Mobius Strip</span>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  return (
    <section className="not-found shell">
      <p className="eyebrow">Outside the surface</p>
      <h1>This path does not continue.</h1>
      <AppLink href="/" navigate={navigate} className="button button-primary">Return home <ArrowIcon /></AppLink>
    </section>
  );
}

export default function App() {
  const [path, navigate] = usePathname();
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const pageName = {
      '/': 'Home',
      '/ecosystem': 'Ecosystem',
      '/protocol': 'Protocol',
      '/token': 'Token',
      '/whitepaper': 'Whitepaper',
    }[path];

    document.title = pageName
      ? `${pageName} | Mobius Strip`
      : 'Page not found | Mobius Strip';
  }, [path]);

  useEffect(() => {
    const heroVideo = mainRef.current?.querySelector('.hero-video video');
    if (!heroVideo) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroVideo.pause();
      return;
    }

    heroVideo.play().catch(() => undefined);
  }, [path]);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const heroEntranceTargets = gsap.utils.toArray('.hero-content > *, .whitepaper-intro > *');
    if (heroEntranceTargets.length) {
      gsap.fromTo(
        heroEntranceTargets,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.05, stagger: 0.09, ease: 'power3.out', delay: 0.15 },
      );
    }

    const videoHero = mainRef.current?.querySelector('.hero-video');
    const videoMedia = videoHero?.querySelector('video');
    if (videoHero && videoMedia) {
      gsap.fromTo(
        videoMedia,
        { yPercent: -4, scale: 1.08 },
        {
          yPercent: 14,
          scale: 1.16,
          ease: 'none',
          scrollTrigger: {
            trigger: videoHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        },
      );

      gsap.to(videoHero.querySelector('.hero-content'), {
        yPercent: -8,
        opacity: 0.72,
        ease: 'none',
        scrollTrigger: {
          trigger: videoHero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        },
      );
    });

    gsap.utils.toArray('.pin-layout').forEach((layout) => {
      const copy = layout.querySelector('.pin-copy');
      const gallery = layout.querySelector('.pin-gallery');
      if (!copy || !gallery || window.innerWidth < 900) return;
      ScrollTrigger.create({
        trigger: layout,
        start: 'top 9%',
        end: () => `+=${Math.max(0, gallery.offsetHeight - copy.offsetHeight)}`,
        pin: copy,
        pinSpacing: false,
      });
    });

    gsap.utils.toArray('.stack-card').forEach((card, index, cards) => {
      gsap.fromTo(
        card,
        { y: 90, scale: 0.97 },
        {
          y: 0,
          scale: 1 - (cards.length - index - 1) * 0.018,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top 18%',
            scrub: 0.8,
          },
        },
      );
    });

    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { scope: mainRef, dependencies: [path], revertOnUpdate: true });

  const page = {
    '/': <HomePage navigate={navigate} />,
    '/ecosystem': <EcosystemPage navigate={navigate} />,
    '/protocol': <ProtocolPage navigate={navigate} />,
    '/token': <TokenPage navigate={navigate} />,
    '/whitepaper': <WhitepaperPage navigate={navigate} />,
  }[path] ?? <NotFound navigate={navigate} />;

  return (
    <main className="app-shell overflow-guard overflow-x-hidden w-full max-w-full" ref={mainRef}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav path={path} navigate={navigate} />
      <div id="main-content" key={path}>{page}</div>
      <Footer navigate={navigate} />
    </main>
  );
}
