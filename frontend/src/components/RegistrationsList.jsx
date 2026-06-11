// VIEW SUBMISSIONS PAGE
// Fetches all rows from MySQL and displays them

import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

function RegistrationsList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load data when page opens
  useEffect(() => {
    fetch(apiUrl('/api/registrations'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setList(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError('Cannot connect to server.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="list-status">Loading...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (list.length === 0) return <p className="list-status">No registrations yet.</p>;

  return (
    <div className="registrations-list">
      {list.map((person) => (
        <div key={person.id} className="registration-card">
          <div className="registration-card-header">
            <h3>{person.first_name} {person.last_name}</h3>
            <span className="registration-id">#{person.id}</span>
          </div>

          <div className="registration-details">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span>{person.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span>{person.phone_number}</span>
            </div>
            {person.city && (
              <div className="detail-item">
                <span className="detail-label">City</span>
                <span>{person.city}</span>
              </div>
            )}
            {person.country && (
              <div className="detail-item">
                <span className="detail-label">Country</span>
                <span>{person.country}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">Submitted</span>
              <span>{person.created_at}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RegistrationsList;
