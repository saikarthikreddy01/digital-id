import { useState, useEffect } from 'react';
import { playScanSound } from '../utils/sound';

export default function NfcScanModal({ isOpen, onClose, data }) {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      playScanSound();
      const timer = setTimeout(() => {
        setScanning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const roll = data.rollNumber || '2024CS8902';
  const name = data.name || 'Karthik R. Sharma';
  const dept = data.department || 'Computer Science & Engineering';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(8, 9, 13, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 460,
          borderRadius: 20,
          background: '#0d0f17',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(52, 211, 153, 0.15)',
          padding: '28px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {scanning ? (
          /* SCANNING RADAR STATE */
          <div
            style={{
              padding: '30px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px solid #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                position: 'relative',
                animation: 'pulseDot 0.8s ease-in-out infinite',
              }}
            >
              📡
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                INTERROGATING NFC CHIP...
              </h3>
              <p
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginTop: 4,
                }}
              >
                13.56 MHz RFID / ISO-14443 Type A
              </p>
            </div>
          </div>
        ) : (
          /* VERIFIED ACCESS GRANTED STATE */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Success Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(52, 211, 153, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  color: '#34d399',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#34d399',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  >
                    ACCESS AUTHORIZED
                  </span>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#34d399',
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: 1,
                  }}
                >
                  Campus Gate Verification
                </h3>
              </div>
            </div>

            {/* Verified Student Telemetry Box */}
            <div
              style={{
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Student Name</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#ffffff' }}>
                  {name}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Roll Number</span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  #{roll}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Department</span>
                <span style={{ fontSize: '0.76rem', color: '#ffffff' }}>{dept}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Security Tier</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#34d399',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  LEVEL 3 — ALL CAMPUS LABS
                </span>
              </div>
            </div>

            {/* Turnstile Permission List */}
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                PERMITTED PHYSICAL LOCATIONS:
              </span>
              ✓ Main Academic Tower &bull; Computer Systems Lab &bull; Digital Innovation Hub &bull; Central
              Library &bull; Sports Complex
            </div>

            {/* Time Stamp */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 10,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.66rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-dim)',
              }}
            >
              <span>GATE: GATE-04 (NORTH TURNSTILE)</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={onClose}
              style={{
                marginTop: 4,
                padding: '9px 18px',
                borderRadius: 9999,
                border: 'none',
                background: '#ffffff',
                color: '#08090d',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close Simulator
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
