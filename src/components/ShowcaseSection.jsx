import { useState } from 'react';
import DigitalIDCard from './DigitalIDCard';

export default function ShowcaseSection({ data, onPrint, onShare }) {
  const [copied, setCopied] = useState(false);

  const hashString = `AETHER·${(data.rollNumber || '2024CS8902').toUpperCase()}·${
    (data.name || 'STUDENT').replace(/\s+/g, '').toUpperCase().slice(0, 6)
  }·SECURE`;

  const copyHash = () => {
    navigator.clipboard?.writeText(hashString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="showcase-section"
      style={{
        position: 'relative',
        padding: '90px 36px 110px',
        zIndex: 2,
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Eyebrow */}
      <span
        style={{
          fontSize: '0.64rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginBottom: 10,
        }}
      >
        // VERIFIED PRODUCTION STAGE
      </span>

      {/* Main Title */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}
      >
        THIS IS YOUR DIGITAL ID.
      </h2>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.96rem',
          maxWidth: 540,
          marginTop: 10,
          marginBottom: 38,
        }}
      >
        Synthesized and ready for physical card badge printing or online credential inspection.
      </p>

      {/* 3D Card Presentation Stage */}
      <div
        style={{
          position: 'relative',
          marginBottom: 30,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <DigitalIDCard data={data} variant="hero" />
      </div>

      {/* Security Hash Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '6px 14px',
          borderRadius: 9999,
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
          }}
        >
          {hashString}
        </span>
        <button
          type="button"
          onClick={copyHash}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#ffffff',
            borderRadius: 9999,
            padding: '3px 10px',
            fontSize: '0.66rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Production Action Buttons */}
      <div
        id="showcase-controls"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          onClick={onPrint}
          style={{
            padding: '12px 28px',
            borderRadius: 9999,
            border: 'none',
            background: '#ffffff',
            color: '#08090d',
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
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
          <span>🖨️</span>
          <span>Download ID / Print (PDF)</span>
        </button>

        <button
          type="button"
          onClick={onShare}
          style={{
            padding: '12px 24px',
            borderRadius: 9999,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(255, 255, 255, 0.04)',
            color: '#ffffff',
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <span>🔗</span>
          <span>Share Digital ID</span>
        </button>

        <a
          href="#studio-section"
          style={{
            padding: '12px 22px',
            borderRadius: 9999,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <span>Modify Data</span>
        </a>
      </div>
    </section>
  );
}
