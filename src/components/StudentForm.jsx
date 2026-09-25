import { useState } from 'react';
import { YEARS } from './studentData';

export default function StudentForm({ data, onChange, onClear }) {
  const [photoError, setPhotoError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    onChange((current) => ({ ...current, [name]: value }));
  };

  const handlePhoto = (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Choose an image file.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setPhotoError('Choose an image smaller than 4 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange((current) => ({ ...current, photo: String(reader.result) }));
      setPhotoError('');
    };
    reader.onerror = () => setPhotoError('That image could not be opened. Try another file.');
    reader.readAsDataURL(file);
  };

  return (
    <form className="student-form" onSubmit={(event) => event.preventDefault()}>
      <section className="form-section" aria-labelledby="personal-heading">
        <div className="form-section__heading">
          <h3 id="personal-heading">Personal information</h3>
          <span>01</span>
        </div>
        <div className="form-grid">
          <Field label="Full name" name="name" value={data.name} onChange={handleChange} placeholder="e.g. Alex Morgan" />
          <Field label="Student ID" name="rollNumber" value={data.rollNumber} onChange={handleChange} placeholder="e.g. NU-26-1042" />
          <Field label="Date of birth" name="dob" type="date" value={data.dob} onChange={handleChange} />
          <SelectField label="Blood group" name="bloodGroup" value={data.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} />
          <SelectField label="Residence" name="residency" value={data.residency} onChange={handleChange} options={['Hosteller', 'Day scholar']} />
          <div className="field field--wide">
            <span className="field-label">Portrait</span>
            <div className="upload-control">
              <div className="upload-control__preview">
                {data.photo ? <img src={data.photo} alt="Selected student portrait" /> : <span>PHOTO</span>}
              </div>
              <div className="upload-control__details">
                <strong>{data.photo ? 'Portrait added' : 'Add a student photo'}</strong>
                <span>JPG, PNG or WebP · up to 4 MB</span>
                <div className="upload-control__actions">
                  <label className="button button--small button--outline" htmlFor="student-photo">Choose photo</label>
                  {data.photo && (
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => onChange((current) => ({ ...current, photo: null }))}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input id="student-photo" className="visually-hidden" type="file" accept="image/*" onChange={handlePhoto} />
                {photoError && <span className="field-error" role="alert">{photoError}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section" aria-labelledby="contact-heading">
        <div className="form-section__heading">
          <h3 id="contact-heading">Contact details</h3>
          <span>02</span>
        </div>
        <div className="form-grid">
          <Field label="Email address" name="email" type="email" value={data.email} onChange={handleChange} placeholder="name@college.edu" />
          <Field label="Phone number" name="phone" type="tel" value={data.phone} onChange={handleChange} placeholder="Your phone number" />
          <Field label="Address" name="address" value={data.address} onChange={handleChange} placeholder="Street, city, postal code" />
        </div>
      </section>

      <section className="form-section form-section--last" aria-labelledby="academic-heading">
        <div className="form-section__heading">
          <h3 id="academic-heading">Academic details</h3>
          <span>03</span>
        </div>
        <div className="form-grid">
          <Field label="College or university" name="collegeName" value={data.collegeName} onChange={handleChange} placeholder="Institution name" />
          <Field label="Program or degree" name="degree" value={data.degree} onChange={handleChange} placeholder="e.g. B.Sc. Computer Science" />
          <Field label="Department" name="department" value={data.department} onChange={handleChange} placeholder="e.g. Computer Science" />
          <label className="field">
            <span className="field-label">Academic year</span>
            <select name="year" value={data.year} onChange={handleChange}>
              <option value="">Select year</option>
              {YEARS.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>
          <Field label="Batch" name="batch" value={data.batch} onChange={handleChange} placeholder="e.g. 2024 - 2028" />
        </div>
      </section>

      <div className="form-actions">
        <span>Changes appear in the preview automatically.</span>
        <button className="text-button" type="button" onClick={() => { setPhotoError(''); onClear(); }}>
          Clear details
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', value, onChange, placeholder }) {
  const id = `student-${name}`;
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <input id={id} name={name} type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  const id = `student-${name}`;
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="">Not selected</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
