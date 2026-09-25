export default function StoryRoadmap() {
  const steps = [
    {
      num: '01',
      title: 'ENTER IDENTITY',
      tag: 'TELEMETRY',
      desc: 'Input personal, academic, and institution data with instant validation.',
    },
    {
      num: '02',
      title: '3D COMPILATION',
      tag: 'REAL-TIME',
      desc: 'Watch the card assemble spatial optics, depth layers, and materials live.',
    },
    {
      num: '03',
      title: 'ENRICH PROFILE',
      tag: 'ATTRIBUTES',
      desc: 'Upload portrait, declare competencies, and attach custom degree info.',
    },
    {
      num: '04',
      title: 'CIPHER MATRIX',
      tag: 'CRYPTOGRAPHY',
      desc: 'Synthesize unique barcode and QR matrix bound to your registration hash.',
    },
    {
      num: '05',
      title: 'EXPORT & VERIFY',
      tag: 'DEPLOYMENT',
      desc: 'Print high-resolution physical badges or share via digital link.',
    },
  ];

  return (
    <section
      id="story-section"
      style={{
        position: 'relative',
        padding: '70px 36px',
        zIndex: 2,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
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
          // WORKFLOW ARCHITECTURE
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          From Telemetry to Spatial Credential
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
            maxWidth: 520,
            margin: '8px auto 0',
          }}
        >
          A minimal five-stage synthesis that guarantees instant reactive rendering, mathematical
          card tilt, and offline-compatible verification.
        </p>
      </div>

      {/* Grid of Steps */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.num}
            style={{
              padding: '22px 18px',
              borderRadius: 16,
              background: '#0d0f17',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
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
            {/* Top Row: Number & Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {step.num}
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {step.tag}
              </span>
            </div>

            {/* Step Title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
