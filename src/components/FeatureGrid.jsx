export default function FeatureGrid() {
  const features = [
    {
      title: 'Spatial Depth & Sheen',
      desc: 'Multi-layer matte obsidian glass with dynamic specular sheen that tracks cursor vectors in real time.',
      tag: 'OPTICAL MATRIX',
    },
    {
      title: 'Micro-Cipher Security',
      desc: 'Each ID card renders a unique deterministic cryptographic serial derived from roll number and academic term.',
      tag: 'AUTHENTICATION',
    },
    {
      title: 'Dual Machine Codes',
      desc: 'Equipped with synchronized vector Barcode and authentic QR matrix, enabling instant scanning by physical campus hardware.',
      tag: 'STANDARDS',
    },
    {
      title: 'High-DPI Print Output',
      desc: 'One-click clean CSS print isolation calibrated to international standard ID-1 (ISO/IEC 7810) physical card dimensions.',
      tag: 'ISO 7810 ID-1',
    },
  ];

  return (
    <section
      id="features-section"
      style={{
        position: 'relative',
        padding: '70px 36px',
        zIndex: 2,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <span
          style={{
            fontSize: '0.64rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            display: 'block',
            marginBottom: 8,
          }}
        >
          // TECHNICAL INTEGRITY
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          Engineered for Institutional Trust
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            maxWidth: 520,
            margin: '8px auto 0',
          }}
        >
          Built to bridge the gap between physical campus identification and modern digital web
          passports with zero latency.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              padding: '24px 22px',
              borderRadius: 16,
              background: '#0d0f17',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                {f.title}
              </h3>
              <span
                style={{
                  fontSize: '0.55rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}
              >
                {f.tag}
              </span>
            </div>

            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
