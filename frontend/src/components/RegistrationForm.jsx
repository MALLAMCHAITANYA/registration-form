// REGISTRATION FORM
// User types details -> clicks Register -> data goes to backend -> saved in MySQL

import { useState } from 'react';
import { apiUrl } from '../api';

// Empty form when page loads
const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  country: '',
};

function RegistrationForm() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // When user types in any input, update form data
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // When user clicks Register button
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Send form data to backend API
      const response = await fetch(apiUrl('/api/registrations'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message);
        return;
      }

      // Success - clear form and show message
      setIsError(false);
      setMessage(data.message);
      setForm(emptyForm);
    } catch {
      setIsError(true);
      setMessage('Cannot connect to server. Start backend with: node server.js');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {message && (
        <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Personal Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Address</h2>

          <div className="form-group">
            <label>Street Address</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input name="state" value={form.state} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input name="country" value={form.country} onChange={handleChange} />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </>
  );
}

export default RegistrationForm;
