import { useState } from 'react';

export default function ShareModal({ isOpen, onClose, data }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const roll = data.rollNumber || '2024CS8902';
  const shareUrl = `${window.location.origin}/#verify-${roll}`;
  const shareText = `Verified Digital College ID: ${data.name || 'Student'} (${
    data.collegeName || 'iSpark College'
  })`;

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.name || 'Student'} — Digital ID`,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      copyToClipboard();
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(8, 9, 13, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
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
          maxWidth: 440,
          borderRadius: 20,
          background: '#0d0f17',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          padding: '24px 22px',
          position: 'relative',
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

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Share Digital Identity
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Direct URL to inspect and verify this credential online.
          </p>
        </div>

        {/* Link Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 10px',
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: 16,
          }}
        >
          <input
            type="text"
            readOnly
            value={shareUrl}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              outline: 'none',
            }}
          />
          <button
            onClick={copyToClipboard}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              background: copied ? '#34d399' : '#ffffff',
              color: copied ? '#08090d' : '#08090d',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s',
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={handleNativeShare}
            style={{
              padding: '9px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            System Share
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${shareText} ${shareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '9px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 500,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
