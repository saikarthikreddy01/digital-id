export default function DigitalIDCard({ data = {}, theme = 'forest', view = 'front' }) {
  const sides = view === 'both' ? ['front', 'back'] : [view];
  const name = data.name?.trim() || 'Your name';
  const initials = data.name?.trim()
    ? data.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0].toUpperCase()).join('')
    : 'ID';

  return (
    <article className={`student-card student-card--${theme} student-card--view-${view}`} aria-label="Digital college ID preview">
      {sides.map((side) => (
        <section className={`student-card__face student-card__${side}`} key={side} aria-label={`ID card ${side}`}>
          {side === 'front' ? (
            <>
              <header className="card-brand-header">
                <img className="card-brand__logo" src="/vigann.svg" alt="Vigann" />
              </header>
              <div className="card-title-band">STUDENT IDENTITY CARD</div>
              <div className="card-front__body">
                <div className="card-portrait">
                  {data.photo ? <img src={data.photo} alt={`${name} portrait`} /> : <Portrait initials={initials} />}
                </div>
                <div className="card-front__details">
                  <p className="card-field-label">STUDENT NAME</p>
                  <h3 className="card-name">{name}</h3>
                  <CardField label="Roll / ID" value={data.rollNumber} fallback="XXXXXXXX" />
                  <CardField label="Department" value={data.department} fallback="N/A" />
                  <CardField label="Batch" value={data.batch} fallback="YYYY - YYYY" />
                  <CardField label="Blood group" value={data.bloodGroup} fallback="N/A" />
                </div>
                <div className="residence-badge">
                  <span>RESIDENCE</span>
                  <strong>{data.residency || 'Not selected'}</strong>
                </div>
              </div>
              <footer className="card-front__footer">
                <div className="card-verification">
                  <span>Save card to generate barcode</span>
                  <strong>VERIFICATION BARCODE</strong>
                  <Barcode value={data.rollNumber || 'STUDENT-ID'} />
                </div>
                <div className="card-contact">
                  <span>CONTACT</span>
                  <strong>{data.phone || 'N/A'}</strong>
                  <small>Issued by {data.collegeName || 'your college'}</small>
                </div>
              </footer>
            </>
          ) : (
            <>
              <header className="card-back__header">
                <img className="card-brand__logo" src="/vigann.svg" alt="Vigann" />
                <div>
                  <p className="card-field-label">STUDENT DETAILS</p>
                  <strong>{data.rollNumber || 'STUDENT ID'}</strong>
                </div>
              </header>
              <div className="card-back__content">
                <div className="card-back__fields">
                  <CardField label="Email" value={data.email} fallback="Not provided" />
                  <CardField label="Phone" value={data.phone} fallback="Not provided" />
                  <CardField label="Program" value={data.degree} fallback="Not provided" />
                  <CardField label="Academic year" value={data.year} fallback="Not provided" />
                  <CardField label="Date of birth" value={formatDate(data.dob)} fallback="Not provided" />
                  <div className="card-address">
                    <CardField label="Address" value={data.address} fallback="Not provided" />
                  </div>
                </div>
                <div className="card-return">
                  <span>IF FOUND, PLEASE RETURN TO</span>
                  <strong>{data.collegeName || 'Your college'}</strong>
                </div>
                <footer className="card-back__footer">
                  <div className="registrar-signature">
                    <span className="signature-script">Registrar</span>
                    <span className="signature-line" />
                    <span>REGISTRAR</span>
                  </div>
                  <div className="barcode-block">
                    <Barcode value={data.rollNumber || 'STUDENT-ID'} />
                    <span>{data.rollNumber || 'STUDENT ID'}</span>
                  </div>
                </footer>
                <p className="card-disclaimer">Preview only. This card is not issued and does not verify enrollment.</p>
              </div>
            </>
          )}
        </section>
      ))}
    </article>
  );
}

function Portrait({ initials }) {
  return (
    <div className="portrait-art" aria-label={`Photo placeholder for ${initials}`}>
      <span className="portrait-art__hair" />
      <span className="portrait-art__neck" />
      <span className="portrait-art__face" />
      <span className="portrait-art__shirt" />
      <span className="portrait-art__tie" />
    </div>
  );
}

function CardField({ label, value, fallback }) {
  return (
    <div className="card-field">
      <span>{label}</span>
      <strong>{value || fallback}</strong>
    </div>
  );
}

function Barcode({ value }) {
  const bits = [...value].slice(0, 30).map((char) => char.charCodeAt(0).toString(2).padStart(7, '0')).join('0');
  return (
    <svg className="card-barcode" viewBox={`0 0 ${bits.length * 2} 28`} aria-hidden="true" focusable="false">
      {bits.split('').map((bit, index) => bit === '1' ? (
        <rect key={index} x={index * 2} y="0" width="1.35" height="28" />
      ) : null)}
    </svg>
  );
}

function formatDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(year, month - 1, day));
}
