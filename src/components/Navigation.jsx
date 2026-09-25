import { useState, useEffect } from 'react';
import { toggleSound, isSoundEnabled } from '../utils/sound';

export default function Navigation({ isUpdating }) {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((window.scrollY || window.pageYOffset) > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '12px 32px' : '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(8, 9, 13, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Brand Logo */}
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: '#ffffff',
            color: '#08090d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.05rem',
            fontWeight: 800,
          }}
        >
          🎓
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            AETHER
          </span>
          <span
            style={{
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            ID.AI
          </span>
        </div>
      </a>

      {/* Clean Navigation Links */}
      <div
        className="no-mobile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        {[
          { label: 'Overview', href: '#hero-section' },
          { label: 'Workflow', href: '#story-section' },
          { label: 'Studio', href: '#studio-section' },
          { label: 'Features', href: '#features-section' },
          { label: '3D Stage', href: '#showcase-section' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={handleToggleSound}
          title={soundOn ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Muted (Click to Unmute)'}
          style={{
            padding: '5px 10px',
            borderRadius: 9999,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: soundOn ? '#ffffff' : 'var(--text-muted)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>{soundOn ? '🔊' : '🔇'}</span>
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>
            {soundOn ? 'FX' : 'OFF'}
          </span>
        </button>

        {/* Live Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 12px',
            borderRadius: 9999,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.68rem',
            color: isUpdating ? '#38bdf8' : '#34d399',
            fontWeight: 600,
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: isUpdating ? '#38bdf8' : '#34d399',
              boxShadow: isUpdating ? '0 0 6px #38bdf8' : '0 0 6px #34d399',
            }}
          />
          <span>{isUpdating ? 'SYNC' : 'LIVE'}</span>
        </div>

        {/* Solid White CTA Button */}
        <a
          href="#studio-section"
          style={{
            padding: '8px 18px',
            borderRadius: 9999,
            border: 'none',
            background: '#ffffff',
            color: '#08090d',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e2e8f0';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.transform = 'none';
          }}
        >
          Create Digital ID
        </a>
      </div>
    </nav>
  );
}
