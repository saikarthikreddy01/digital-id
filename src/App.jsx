import { useEffect, useLayoutEffect, useState } from 'react';
import Scene from './Scene';
import StudioSection from './components/StudioSection';
import { DEMO_DATA, EMPTY_DATA } from './components/studentData';

const INTRO_MESSAGES = [
  'Your digital identity is on its way',
  'Every detail, shaped around you',
  'Your campus ID is coming into view',
  'Next stop: your Digital ID studio',
];

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [introKey, setIntroKey] = useState(0);
  const [pageTheme, setPageTheme] = useState('dark');
  const [data, setData] = useState(DEMO_DATA);
  const [introMessage, setIntroMessage] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [focusPreviewOnEnter, setFocusPreviewOnEnter] = useState(false);

  useEffect(() => {
    if (screen !== 'intro') return undefined;

    const updateEnterButton = () => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      setIntroComplete(maxScroll > 0 && window.scrollY >= maxScroll - 2);
    };

    window.addEventListener('scroll', updateEnterButton, { passive: true });
    window.addEventListener('resize', updateEnterButton);
    updateEnterButton();
    return () => {
      window.removeEventListener('scroll', updateEnterButton);
      window.removeEventListener('resize', updateEnterButton);
    };
  }, [introKey, screen]);

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.getElementById('root')?.scrollTo(0, 0);
      document.querySelector('.studio-shell')?.scrollTo(0, 0);
    };

    if (screen !== 'studio') {
      resetScroll();
      return undefined;
    }

    const studio = document.querySelector('.studio-shell');
    const revealPreview = () => {
      if (focusPreviewOnEnter) {
        const preview = document.querySelector('#student-card');
        if (!preview || !studio) return;

        const headerBottom = document.querySelector('.studio-header')?.getBoundingClientRect().bottom || 0;
        const previewBounds = preview.getBoundingClientRect();
        const visibleHeight = Math.max(0, window.innerHeight - headerBottom);
        const desiredTop = headerBottom + Math.max(12, (visibleHeight - previewBounds.height) / 2);
        const maxScroll = Math.max(0, studio.scrollHeight - studio.clientHeight);
        studio.scrollTop = Math.min(maxScroll, Math.max(0, studio.scrollTop + previewBounds.top - desiredTop));
      } else {
        resetScroll();
      }
    };
    let lastInputAt = performance.now();
    let releaseTimer;
    const holdScroll = (event) => {
      event.preventDefault();
      lastInputAt = performance.now();
    };
    const releaseWhenIdle = () => {
      const idleFor = performance.now() - lastInputAt;
      if (idleFor < 450) {
        releaseTimer = window.setTimeout(releaseWhenIdle, 450 - idleFor);
        return;
      }

      window.removeEventListener('wheel', holdScroll, true);
      window.removeEventListener('touchmove', holdScroll, true);
      revealPreview();
    };
    window.addEventListener('wheel', holdScroll, { capture: true, passive: false });
    window.addEventListener('touchmove', holdScroll, { capture: true, passive: false });
    resetScroll();
    revealPreview();
    releaseTimer = window.setTimeout(releaseWhenIdle, 450);

    return () => {
      window.clearTimeout(releaseTimer);
      window.removeEventListener('wheel', holdScroll, true);
      window.removeEventListener('touchmove', holdScroll, true);
    };
  }, [focusPreviewOnEnter, screen]);

  const replayIntro = () => {
    window.scrollTo(0, 0);
    document.getElementById('root')?.scrollTo(0, 0);
    document.querySelector('.studio-shell')?.scrollTo(0, 0);
    setIntroKey((key) => key + 1);
    setIntroMessage(0);
    setIntroComplete(false);
    setFocusPreviewOnEnter(false);
    setScreen('intro');
  };

  const openStudio = () => {
    setFocusPreviewOnEnter(true);
    setScreen('studio');
  };

  if (screen === 'intro') {
    return (
      <div className="intro-stage">
        <Scene
          key={introKey}
          onMessageChange={setIntroMessage}
        />
        <div className="intro-title">
          <h1 id="digital-id"><span>Digital</span> <span>ID</span></h1>
          <p className="intro-message" key={introMessage}>{INTRO_MESSAGES[introMessage]}</p>
        </div>
        {introComplete ? (
          <button className="intro-enter-button" type="button" onClick={openStudio}>
            Enter Digital ID <span aria-hidden="true">&#8594;</span>
          </button>
        ) : (
          <div className="intro-scroll-cue" aria-hidden="true">
            <span>Scroll to enter</span>
            <span className="intro-scroll-cue__arrow">&#8595;</span>
          </div>
        )}
        <header className="site-nav">
          <a className="site-brand" href="#digital-id" aria-label="Vigann digital ID">
            <img className="site-brand__logo" src="/vigann.svg" alt="Vigann" />
            <span className="site-brand__divider" aria-hidden="true" />
            <span className="site-brand__name">DIGITAL ID</span>
          </a>
        </header>
      </div>
    );
  }

  return (
    <div className={`studio-shell studio-shell--${pageTheme}`}>
      <header className="studio-header">
        <a className="studio-brand" href="#student-card" aria-label="Vigann digital ID studio">
          <img src="/vigann.svg" alt="Vigann" />
          <span className="studio-brand__divider" aria-hidden="true" />
          <span><strong>Campus ID Studio</strong><small>Digital student card</small></span>
        </a>
        <div className="studio-header__actions">
          <div className="theme-switch" role="group" aria-label="Page theme">
            {['light', 'dark'].map((theme) => (
              <button
                key={theme}
                type="button"
                aria-pressed={pageTheme === theme}
                onClick={() => setPageTheme(theme)}
              >
                <span className={`theme-switch__swatch theme-switch__swatch--${theme}`} aria-hidden="true" />
                {theme === 'light' ? 'Light' : 'Dark'}
              </button>
            ))}
          </div>
          <button className="replay-button" type="button" onClick={replayIntro}>
            Replay intro <span aria-hidden="true">&#8635;</span>
          </button>
        </div>
      </header>

      <main className="studio-main">
        <div className="studio-intro">
          <p className="studio-kicker">STUDENT SERVICES / DIGITAL ID</p>
          <h1>Create your college ID</h1>
          <p>Enter your details and watch both sides update instantly.</p>
        </div>
        <StudioSection
          data={data}
          onChange={setData}
          onClear={() => setData(EMPTY_DATA)}
          onLoadSample={() => setData(DEMO_DATA)}
        />
      </main>

      <footer className="studio-footer">
        <span>PREVIEW COPY</span>
        <span>Your details stay on this page and are not sent to a server.</span>
      </footer>
    </div>
  );
}
