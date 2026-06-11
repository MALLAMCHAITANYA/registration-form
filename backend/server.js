// BACKEND SERVER (In-Memory Storage Version)
// Stores registration data temporarily in the server's memory

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Allow React app (localhost + Vercel) to talk to this server
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.includes('localhost') ||
        origin.endsWith('.vercel.app') ||
        origin === FRONTEND_URL
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
  })
);

// Read JSON data sent from the form
app.use(express.json());

// In-Memory Database Array (Data is stored here while the server is running)
const registrations = [];
let nextId = 1;

// --- API 1: Save a new registration ---
app.post('/api/registrations', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    address,
    city,
    state,
    country,
  } = req.body;

  // Check required fields
  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: 'First name, last name, email, and phone number are required.',
    });
  }

  // Duplicate email check (case-insensitive)
  const isDuplicate = registrations.some(
    (reg) => reg.email.toLowerCase() === email.toLowerCase()
  );

  if (isDuplicate) {
    return res.status(409).json({
      success: false,
      message: 'This email is already registered.',
    });
  }

  // Save the registration to our temporary list
  const newRegistration = {
    id: nextId++,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
    date_of_birth: dateOfBirth || null,
    gender: gender || null,
    address: address || null,
    city: city || null,
    state: state || null,
    country: country || null,
    created_at: new Date().toISOString()
  };

  registrations.push(newRegistration);

  res.status(201).json({
    success: true,
    message: 'Registration submitted successfully!',
    id: newRegistration.id,
  });
});

// --- API 2: Get all registrations ---
app.get('/api/registrations', (req, res) => {
  // Return list sorted by newest first
  const sortedRegistrations = [...registrations].reverse();
  res.json({ success: true, data: sortedRegistrations });
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log('Connected to In-Memory Database');
  console.log(`Server running on http://localhost:${PORT}`);
});
