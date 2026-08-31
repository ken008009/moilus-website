import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Toast } from 'antd-mobile';
import { ChevronDown, Globe2 } from 'lucide-react';
import { useWallet } from './wallet/WalletContext.jsx';
import BusinessWalletGate from './components/BusinessWalletGate.jsx';
import StakingPage from './pages/subPages/staking.jsx';
import CommunityOperationsPage from './pages/subPages/community.jsx';
import { useWebsiteContent } from './content/websiteContent.js';
import { LANGUAGE_OPTIONS, NAV_ITEMS } from './i18n/siteConfig.js';
import { ETH } from './tools/contract.js';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = NAV_ITEMS;
const languageOptions = LANGUAGE_OPTIONS;

const usesFileRouter = window.location.protocol === 'file:';
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

const productChapterImages = [imagery.mining, imagery.dao, imagery.payments];
const ecosystemImages = [imagery.mining, imagery.dao, imagery.custody, imagery.gameFi, imagery.chat];
const journeyImages = [imagery.payments, imagery.gameFi, imagery.mining];

function usePathname() {
  const location = useLocation();
  const routerNavigate = useNavigate();

  const navigate = (href, options = {}) => {
    if (href === location.pathname && !options.replace) return;
    routerNavigate(href, options);
  };

  return [location.pathname, navigate];
}

function formatAddress(value = '') {
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function OperationsPage({ children }) {
  return <section className="business-page-shell">{children}</section>;
}

function AppLink({ href, navigate, className = '', children, onClick, ...rest }) {
  return (
    <a
      href={usesFileRouter ? `#${href}` : href}
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

function LanguageSwitcher({ className = '' }) {
  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'en';
  const currentLabel = languageOptions.find(([value]) => value === currentLanguage)?.[1] || 'English';

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!switcherRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className={`language-switcher ${className} ${open ? 'is-open' : ''}`} ref={switcherRef}>
      <button
        className="language-switcher-button"
        type="button"
        aria-label="Switch language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Globe2 className="language-globe" aria-hidden="true" />
        <span>{currentLabel}</span>
        <ChevronDown className="language-chevron" aria-hidden="true" />
      </button>

      {open && (
        <div className="language-menu" role="listbox" aria-label="Choose language">
          {languageOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="option"
              aria-selected={currentLanguage === value}
              className={currentLanguage === value ? 'is-active' : ''}
              onClick={() => {
                i18n.changeLanguage(value);
                setOpen(false);
              }}
            >
              <span>{label}</span>
              {currentLanguage === value && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Nav({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState('');
  const { address, status: walletStatus, connect } = useWallet();
  const { t } = useTranslation();
  const website = useWebsiteContent();

  const handleCreateLink = async () => {
    if (walletStatus === 'connecting') return;

    try {
      Toast.show({
        icon: 'loading',
        content: t('Connecting wallet...'),
        duration: 0,
        maskClickable: false,
      });

      await connect();
      Toast.clear();
    } catch (error) {
      Toast.clear();
      Toast.show({
        icon: 'fail',
        content: error?.code === 4001
          ? t('User rejected the request')
          : error?.message || t('Failed to connect wallet'),
      });
    }
  };

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

  useEffect(() => {
    if (!address || !open) {
      if (!address) setParent('');
      return undefined;
    }

    let cancelled = false;
    ETH.userView(address)
      .then((userData) => {
        if (cancelled) return;
        const nextParent = userData?.parent || '';
        const hasParent = Boolean(nextParent) && nextParent.toLowerCase() !== ZERO_ADDRESS.toLowerCase();
        setParent(hasParent ? nextParent : '');
      })
      .catch(() => {
        if (!cancelled) setParent('');
      });

    return () => {
      cancelled = true;
    };
  }, [address, open]);

  const walletControl = (mobile = false) => (
    !address ? (
      <button
        type="button"
        className={`nav-cta wallet-cta ${mobile ? 'wallet-cta-mobile' : ''}`}
        onClick={handleCreateLink}
        disabled={walletStatus === 'connecting'}
      >
        {walletStatus === 'connecting' ? t('Connecting wallet') : t('JOIN')}
      </button>
    ) : (
      <span
        className={`nav-cta wallet-cta wallet-address ${mobile ? 'wallet-cta-mobile' : ''}`}
        title={address}
      >
        {formatAddress(address)}
      </span>
    )
  );

  return (
    <header className={`site-header ${open ? 'menu-is-open' : ''}`}>
      <nav className={`nav-shell ${open ? 'menu-open' : ''}`} aria-label="Primary navigation">
        <AppLink href="/" navigate={navigate} className="brand-link" aria-label="Mobius Strip home">
          <img src={logoSrc} alt="Mobius Strip" />
        </AppLink>

        <div className={`mobile-menu-panel ${open ? 'is-open' : ''}`}>
          <div className="mobile-menu-toolbar">
            {!address ? (
              walletControl(true)
            ) : (
              <div className="mobile-menu-account">
                <span className="mobile-menu-account-address" title={address}>
                  {formatAddress(address)}
                </span>
              </div>
            )}
          </div>
          <div id="primary-menu" className="nav-links">
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
                {website.nav[item.key]}
              </AppLink>
            ))}
            <LanguageSwitcher className="language-switcher-mobile" />
            {parent && (
              <div className="mobile-menu-parent">
                <span className="mobile-menu-parent-label">{t('Referrer')}</span>
                <span className="mobile-menu-parent-address" title={parent}>
                  {formatAddress(parent)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="nav-actions">
          <LanguageSwitcher className="language-switcher-desktop" />
          {walletControl()}
        </div>

        <div className="mobile-nav-controls">
          {address && !open && (
            <span className="mobile-header-address" title={address}>
              {formatAddress(address)}
            </span>
          )}
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
        </div>
      </nav>
    </header>
  );
}

function Hero({ eyebrow, title, copy, image, alt, video, primary, secondary, navigate, compact = false }) {
  const { common } = useWebsiteContent();

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
        {common.scrollCue}
      </div>
    </section>
  );
}

function Marquee() {
  const { common } = useWebsiteContent();
  const items = common.marquee;
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
  const { home } = useWebsiteContent();

  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        title={<>{home.hero.title[0]}<br />{home.hero.title[1]}</>}
        copy={home.hero.copy}
        image={imagery.mining}
        video={homeHeroVideoSrc}
        alt="A real cryptocurrency mining facility photographed at night"
        primary={{ href: '/ecosystem', label: home.hero.primary }}
        secondary={{ href: '/protocol', label: home.hero.secondary }}
        navigate={navigate}
      />

      <Marquee />

      <section className="chapter shell">
        <SectionHeading
          {...home.overview}
        />

        <div className="bento-grid grid-flow-dense">
          <AppLink href="/ecosystem" navigate={navigate} className="bento-card bento-lead media-link group reveal">
            <img src={imagery.custody} alt="Hands operating a physical hardware wallet beside a laptop" />
            <div className="card-wash" />
            <div className="bento-content">
              <span>{home.overview.cards[0][0]}</span>
              <h3>{home.overview.cards[0][1]}</h3>
              <ArrowIcon />
            </div>
          </AppLink>
          <AppLink href="/protocol" navigate={navigate} className="bento-card bento-small media-link group reveal">
            <img src={imagery.hardware} alt="Liquid-cooled server hardware inside a compute rack" />
            <div className="card-wash" />
            <div className="bento-content">
              <span>{home.overview.cards[1][0]}</span>
              <h3>{home.overview.cards[1][1]}</h3>
              <ArrowIcon />
            </div>
          </AppLink>
          <AppLink href="/token" navigate={navigate} className="bento-card bento-small bento-tone group reveal">
            <div className="token-orbit" aria-hidden="true"><span>MS</span></div>
            <div className="bento-content">
              <span>{home.overview.cards[2][0]}</span>
              <h3>{home.overview.cards[2][1]}</h3>
              <ArrowIcon />
            </div>
          </AppLink>
        </div>
      </section>

      <section className="statement chapter shell reveal">
        <p>
          {home.statement[0]}
          <span
            className="inline-image"
            role="img"
            aria-label="Luminous city detail"
            style={{ backgroundImage: `url(${imagery.payments})` }}
          />
          {home.statement[1]}
        </p>
      </section>

      <section className="pin-layout chapter shell">
        <div className="pin-copy">
          <p className="eyebrow">{home.journey.eyebrow}</p>
          <h2>{home.journey.title[0]}<br />{home.journey.title[1]}</h2>
          <p>{home.journey.copy}</p>
          <AppLink href="/ecosystem" navigate={navigate} className="text-link">
            {home.journey.link} <ArrowIcon />
          </AppLink>
        </div>
        <div className="pin-gallery">
          {home.journey.chapters.map(([title, copy], index) => (
            <article className="gallery-card reveal" key={title}>
              <div className="gallery-image">
                <img src={productChapterImages[index]} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <ActionChapter
        title={home.action.title}
        copy={home.action.copy}
        primary={{ href: '/ecosystem', label: home.action.primary }}
        secondary={{ href: '/token', label: home.action.secondary }}
        navigate={navigate}
      />
    </>
  );
}

function EcosystemPage({ navigate }) {
  const [active, setActive] = useState(0);
  const { ecosystem } = useWebsiteContent();

  return (
    <>
      <Hero
        eyebrow={ecosystem.hero.eyebrow}
        title={ecosystem.hero.title}
        copy={ecosystem.hero.copy}
        image={imagery.custody}
        alt="Hands using a physical crypto hardware wallet at a real desk"
        primary={{ href: '/protocol', label: ecosystem.hero.primary }}
        secondary={{ href: '/token', label: ecosystem.hero.secondary }}
        navigate={navigate}
        compact
      />

      <section className="chapter shell">
        <SectionHeading
          {...ecosystem.productsHeading}
        />
        <div className="accordion" role="list">
          {ecosystem.products.map(([name, note, copy], index) => (
            <button
              className={`accordion-item ${active === index ? 'is-active' : ''}`}
              type="button"
              key={name}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-expanded={active === index}
              aria-label={`${name}: ${note}`}
            >
              <img src={ecosystemImages[index]} alt="" loading="lazy" />
              <div className="accordion-wash" />
              <span className="accordion-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="accordion-title">
                <small>{note}</small>
                <h3>{name}</h3>
                <p>{copy}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="stack-section chapter shell">
        <SectionHeading
          {...ecosystem.journeyHeading}
        />
        <div className="stack-list">
          {ecosystem.journey.map(([title, copy], index) => (
            <article className="stack-card" key={title} style={{ '--stack-index': index }}>
              <img src={journeyImages[index]} alt="" loading="lazy" />
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
        title={ecosystem.action.title}
        copy={ecosystem.action.copy}
        primary={{ href: '/protocol', label: ecosystem.action.primary }}
        secondary={{ href: '/token', label: ecosystem.action.secondary }}
        navigate={navigate}
      />
    </>
  );
}

function ProtocolPage({ navigate }) {
  const { protocol } = useWebsiteContent();

  return (
    <>
      <Hero
        eyebrow={protocol.hero.eyebrow}
        title={protocol.hero.title}
        copy={protocol.hero.copy}
        image={imagery.hardware}
        alt="Real liquid-cooled blockchain compute hardware"
        primary={{ href: '#thresholds', label: protocol.hero.primary }}
        secondary={{ href: '/token', label: protocol.hero.secondary }}
        navigate={(href) => {
          if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          else navigate(href);
        }}
        compact
      />

      <section className="chapter shell" id="thresholds">
        <SectionHeading
          {...protocol.bandsHeading}
        />
        <div className="protocol-cycle">
          <figure className="protocol-cycle-figure reveal">
            <img
              src={imagery.growthCycle}
              alt="Mobius Strip market growth cycle showing repeated rises, corrections and higher recovery floors"
              loading="lazy"
            />
            <figcaption>{protocol.cycleCaption}</figcaption>
          </figure>

          <div className="protocol-band-list">
            {protocol.bands.map(([trigger, title, copy, metric, response], index) => (
              <article className="protocol-band reveal" key={trigger}>
                <div className="protocol-band-topline">
                  <span>{trigger}</span>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </div>
                <div className="protocol-band-metric">
                  <strong>{metric}</strong>
                  <span>{response}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
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
          <p className="eyebrow">{protocol.circulation.eyebrow}</p>
          <h2>{protocol.circulation.title}</h2>
          <p>{protocol.circulation.copy}</p>
          <div className="protocol-detail">
            <span>{protocol.circulation.label}</span>
            <strong>0.02%</strong>
            <p>{protocol.circulation.detail}</p>
          </div>
        </div>
      </section>

      <section className="chapter shell">
        <SectionHeading
          {...protocol.stakingHeading}
        />
        <div className="parameter-row">
          {protocol.parameters.map(([label, value, copy]) => (
            <article className="parameter-card reveal" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="risk-note reveal">
          {protocol.risk}
        </p>
      </section>

      <ActionChapter
        title={protocol.action.title}
        copy={protocol.action.copy}
        primary={{ href: '/token', label: protocol.action.primary }}
        secondary={{ href: '/ecosystem', label: protocol.action.secondary }}
        navigate={navigate}
      />
    </>
  );
}

function TokenPage({ navigate }) {
  const { token } = useWebsiteContent();

  return (
    <>
      <Hero
        eyebrow={token.hero.eyebrow}
        title={token.hero.title}
        copy={token.hero.copy}
        image={imagery.secureElement}
        alt="Macro photograph of the secure element inside a hardware wallet"
        primary={{ href: '#allocation', label: token.hero.primary }}
        secondary={{ href: '/ecosystem', label: token.hero.secondary }}
        navigate={(href) => {
          if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          else navigate(href);
        }}
        compact
      />

      <section className="allocation chapter shell" id="allocation">
        <div className="allocation-figure reveal">
          <div className="allocation-ring" aria-label={token.allocationAria}>
            <div>
              <strong>1B</strong>
              <span>{token.total}</span>
            </div>
          </div>
        </div>
        <div className="allocation-copy reveal">
          <p className="eyebrow">{token.eyebrow}</p>
          <h2>{token.title}</h2>
          {token.allocations.map(([value, copy], index) => (
            <div className="allocation-item" key={value}>
              <span className={`allocation-swatch ${index === 0 ? 'is-reserve' : 'is-liquidity'}`} />
              <strong>{value}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter shell">
        <SectionHeading
          eyebrow={token.roadmapEyebrow}
          title={token.roadmapTitle}
        />
        <div className="roadmap">
          {token.roadmap.map(([phase, title, copy], index) => (
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
        title={token.action.title}
        copy={token.action.copy}
        primary={{ href: '/ecosystem', label: token.action.primary }}
        secondary={{ href: '/protocol', label: token.action.secondary }}
        navigate={navigate}
      />
    </>
  );
}

function WhitepaperPage({ navigate }) {
  const { whitepaper } = useWebsiteContent();

  return (
    <>
      <section className="whitepaper-hero">
        <div className="whitepaper-hero-grid shell">
          <div className="whitepaper-intro">
            <p className="eyebrow hero-kicker">{whitepaper.hero.eyebrow}</p>
            <h1>{whitepaper.hero.title}</h1>
            <p className="hero-copy">{whitepaper.hero.copy}</p>
            <div className="hero-actions">
              <a href="#whitepaper-download" className="button button-primary">
                {whitepaper.hero.button} <ArrowIcon />
              </a>
            </div>
          </div>

          <figure className="whitepaper-document reveal">
            <div className="whitepaper-cover">
              <img
                src={whitepaperCoverSrc}
                alt={whitepaper.hero.coverAlt}
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>{whitepaper.hero.edition}</span>
              <span>{whitepaper.hero.pages}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="chapter shell" id="whitepaper-download">
        <SectionHeading
          {...whitepaper.downloadHeading}
        />

        <article className="whitepaper-file reveal">
          <div className="whitepaper-file-copy">
            <span>PDF</span>
            <div>
              <h3>{whitepaper.fileTitle}</h3>
              <p>{whitepaper.fileMeta}</p>
            </div>
          </div>
          <div className="whitepaper-file-actions">
            <a
              href={whitepaperPdfSrc}
              className="button button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              {whitepaper.open}
            </a>
            <a href={whitepaperPdfSrc} className="button button-primary" download>
              {whitepaper.download} <ArrowIcon />
            </a>
          </div>
        </article>
      </section>

      <section className="whitepaper-index chapter shell">
        <div className="whitepaper-index-intro reveal">
          <p className="eyebrow">{whitepaper.index.eyebrow}</p>
          <h2>{whitepaper.index.title}</h2>
          <p>{whitepaper.index.copy}</p>
        </div>
        <div className="whitepaper-topics">
          {whitepaper.topics.map(([title, copy]) => (
            <article className="whitepaper-topic reveal" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <ActionChapter
        title={whitepaper.action.title}
        copy={whitepaper.action.copy}
        primary={{ href: '/protocol', label: whitepaper.action.primary }}
        secondary={{ href: '/ecosystem', label: whitepaper.action.secondary }}
        navigate={navigate}
      />
    </>
  );
}

function ActionChapter({ title, copy, primary, secondary, navigate }) {
  const { common } = useWebsiteContent();

  return (
    <section className="action-chapter chapter shell reveal">
      <div className="action-glow" aria-hidden="true" />
      <p className="eyebrow">{common.continueLoop}</p>
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
  const website = useWebsiteContent();

  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <img src={logoSrc} alt="Mobius Strip" />
        <p>{website.common.footerTagline}</p>
        <div className="footer-nav">
          {navItems.map((item) => (
            <AppLink key={item.href} href={item.href} navigate={navigate}>
              {website.nav[item.key]}
            </AppLink>
          ))}
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>{website.common.footerRisk}</p>
        <span>© 2026 Mobius Strip</span>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  const { common } = useWebsiteContent();

  return (
    <section className="not-found shell">
      <p className="eyebrow">{common.notFoundEyebrow}</p>
      <h1>{common.notFoundTitle}</h1>
      <AppLink href="/" navigate={navigate} className="button button-primary">{common.returnHome} <ArrowIcon /></AppLink>
    </section>
  );
}

export default function App() {
  const [path, navigate] = usePathname();
  const mainRef = useRef(null);
  const { t, i18n } = useTranslation();
  const website = useWebsiteContent();

  useEffect(() => {
    const syncLanguage = (language) => {
      const normalizedLanguage = language || 'en';
      localStorage.setItem('language', normalizedLanguage);
      document.documentElement.lang = normalizedLanguage;
      document.documentElement.dir = ['ar', 'ur'].includes(normalizedLanguage) ? 'rtl' : 'ltr';
    };

    syncLanguage(i18n.resolvedLanguage || i18n.language);
    i18n.on('languageChanged', syncLanguage);
    return () => i18n.off('languageChanged', syncLanguage);
  }, [i18n]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const pageName = {
      '/': website.nav.home,
      '/ecosystem': website.nav.ecosystem,
      '/protocol': website.nav.protocol,
      '/token': website.nav.token,
      '/whitepaper': website.nav.whitepaper,
      '/staking': website.nav.staking,
      '/community': website.nav.community,
    }[path];

    document.title = pageName
      ? `${pageName} | Mobius Strip`
      : `${website.common.notFoundTitle} | Mobius Strip`;
  }, [path, website]);

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
    '/staking': (
      <OperationsPage>
        <BusinessWalletGate>
          <StakingPage
            navigate={navigate}
            t={t}
          />
        </BusinessWalletGate>
      </OperationsPage>
    ),
    '/community': (
      <OperationsPage>
        <BusinessWalletGate>
          <CommunityOperationsPage
            navigate={navigate}
            formatAddress={formatAddress}
            t={t}
          />
        </BusinessWalletGate>
      </OperationsPage>
    ),
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
