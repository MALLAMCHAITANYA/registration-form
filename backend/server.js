// BACKEND SERVER
// This file receives form data from React and saves it in MySQL

const express = require('express');
const cors = require('cors');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Allow React app to talk to this server
app.use(cors({ origin: [FRONTEND_URL, 'http://localhost:3000'] }));

// Read JSON data sent from the form
app.use(express.json());

// --- API 1: Save a new registration ---
app.post('/api/registrations', async (req, res) => {
  // Get all fields from the form
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

  // SQL query to insert one row into the table
  const sql = `
    INSERT INTO registrations (
      first_name, last_name, email, phone_number,
      date_of_birth, gender, address, city, state, country
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth || null,
    gender || null,
    address || null,
    city || null,
    state || null,
    country || null,
  ];

  try {
    const [result] = await db.execute(sql, values);

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully!',
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered.',
      });
    }

    console.error('Database error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Database error. Check MySQL is running and config.js password is correct.',
    });
  }
});

// --- API 2: Get all registrations ---
app.get('/api/registrations', async (req, res) => {
  const sql = 'SELECT * FROM registrations ORDER BY created_at DESC';

  try {
    const [rows] = await db.execute(sql);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations.',
    });
  }
});

// --- Start the server (only after MySQL connection works) ---
async function startServer() {
  if (!require('./config').password) {
    console.error('\nERROR: MySQL password is empty in config.js');
    console.error('Open backend/config.js and set your MySQL password, then save the file.\n');
    process.exit(1);
  }

  try {
    await db.execute('SELECT 1');
    console.log('Connected to MySQL database: registration_db');
  } catch (error) {
    console.error('\nERROR: Cannot connect to MySQL.');
    console.error(error.message);
    console.error('Check: 1) MySQL Server is running  2) password in config.js is correct  3) schema.sql was executed in Workbench\n');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
