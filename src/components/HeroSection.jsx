import DigitalIDCard from './DigitalIDCard';

export default function HeroSection({ data, isUpdating }) {
  return (
    <section
      id="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 36px 60px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          alignItems: 'center',
          gap: 48,
          zIndex: 2,
        }}
        className="hero-grid"
      >
        {/* Left Column: Minimal Cinematic Typography & Clean CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Eyebrow Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 12px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#ffffff',
                }}
              />
              Spatial Identity Architecture
            </span>
          </div>

          {/* Main Cinematic Clean Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            YOUR IDENTITY.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>DIGITALLY REDEFINED.</span>
          </h1>

          {/* Clean Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: 500,
              letterSpacing: '-0.01em',
            }}
          >
            A minimal, spatial digital credential suite. Enter personal and academic telemetry,
            render a titanium-grade 3D ID card in real time, and export verified credentials for
            campus and web.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
            <a
              href="#studio-section"
              style={{
                padding: '12px 28px',
                borderRadius: 9999,
                border: 'none',
                background: '#ffffff',
                color: '#08090d',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                display: 'inline-flex',
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
              <span>Create Your Digital ID</span>
              <span style={{ fontSize: '1rem' }}>→</span>
            </a>

            <a
              href="#showcase-section"
              style={{
                padding: '12px 24px',
                borderRadius: 9999,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
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
              <span>Preview 3D Stage</span>
            </a>
          </div>

          {/* Clean Capabilities Strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              paddingTop: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: 6,
            }}
          >
            {[
              { label: '3D Spatial Physics', sub: 'Interactive Tilt Engine' },
              { label: 'Dual Machine Codes', sub: 'Synchronized Barcode + QR' },
              { label: 'High-DPI Print', sub: 'Vector PDF Calibrated' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontSize: '0.66rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Clean Floating 3D ID Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle Neutral Shadow */}
          <div
            style={{
              position: 'absolute',
              width: 340,
              height: 340,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div
            style={{
              animation: 'floatSubtle 6s ease-in-out infinite',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <DigitalIDCard data={data} isUpdating={isUpdating} variant="hero" />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 18,
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>Hover to test 3D perspective tilt</span>
          </div>
        </div>
      </div>
    </section>
  );
}
