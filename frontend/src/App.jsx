// MAIN PAGE - switches between Form and List views

import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import RegistrationsList from './components/RegistrationsList';

function App() {
  // 'form' = show registration form, 'list' = show saved data
  const [view, setView] = useState('form');

  return (
    <div className="app">
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <h1>Registration Form</h1>
            <p>
              {view === 'form'
                ? 'Fill in your details and click Register.'
                : 'All data saved in MySQL database.'}
            </p>
          </div>

          {/* Two buttons to switch pages */}
          <div className="view-tabs">
            <button
              type="button"
              className={`tab-btn ${view === 'form' ? 'active' : ''}`}
              onClick={() => setView('form')}
            >
              New Registration
            </button>
            <button
              type="button"
              className={`tab-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              View Submissions
            </button>
          </div>

          {view === 'form' ? <RegistrationForm /> : <RegistrationsList />}
        </div>
      </div>
    </div>
  );
}

export default App;
