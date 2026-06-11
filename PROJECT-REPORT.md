# Registration Form Application — Project Report

**Project Name:** Registration Form Web Application  
**Technologies:** React, Node.js, Express, MySQL, SQL  
**Date:** June 2026  

---

## 1. Introduction

This project is a full-stack web application that allows users to register by filling out a form with personal details. The data is validated on the server and stored permanently in a MySQL database. Administrators can view all submissions through the web app or directly in MySQL Workbench.

---

## 2. Objectives

- Build a user-friendly registration form using **React**
- Store user data securely in a **MySQL** database using **SQL**
- Create a **REST API** to connect the frontend and database
- Allow viewing of all submitted registrations
- Use **MySQL Workbench** to manage and inspect the database

---

## 3. Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | Frontend user interface (form, tabs, styling) |
| **Vite** | Fast development server and build tool for React |
| **Node.js** | JavaScript runtime for the backend |
| **Express** | Web server and REST API |
| **MySQL** | Relational database to store registrations |
| **MySQL Workbench** | Visual tool to view and query the database |
| **SQL** | INSERT and SELECT queries to save and read data |

---

## 4. System Architecture

```
┌─────────────────┐     HTTP Request      ┌─────────────────┐     SQL Query     ┌─────────────────┐
│   React App     │  ──────────────────►  │  Express API    │  ─────────────►  │  MySQL Database │
│   (Frontend)    │  ◄──────────────────  │  (Backend)      │  ◄─────────────  │  registration_db│
│   Port 3000     │     JSON Response     │  Port 5000      │     Rows/Data     │                 │
└─────────────────┘                       └─────────────────┘                   └─────────────────┘
```

**Data Flow:**
1. User fills the registration form in the browser
2. React sends form data to the backend API using `fetch`
3. Express validates the data and runs an SQL `INSERT` query
4. MySQL saves the new row in the `registrations` table
5. Success message is shown to the user

---

## 5. Features

### Registration Form
- First Name, Last Name (required)
- Email, Phone Number (required)
- Date of Birth, Gender (optional)
- Address, City, State, Country (optional)
- Email duplicate prevention
- Success and error messages

### View Submissions
- Lists all saved registrations from the database
- Shows name, email, phone, city, country, and submission date

### Database (MySQL Workbench)
- Table: `registrations`
- Query: `SELECT * FROM registrations;` to view all data

---

## 6. Database Design

**Database:** `registration_db`  
**Table:** `registrations`

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Primary Key) | Auto-increment unique ID |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| email | VARCHAR(255) | Unique email address |
| phone_number | VARCHAR(20) | Contact number |
| date_of_birth | DATE | Date of birth |
| gender | VARCHAR(20) | Gender |
| address | TEXT | Street address |
| city | VARCHAR(100) | City |
| state | VARCHAR(100) | State |
| country | VARCHAR(100) | Country |
| created_at | TIMESTAMP | When the form was submitted |

---

## 7. Project File Structure

```
Registration Form/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 → Main page with tabs
│   │   ├── main.jsx                → React entry point
│   │   ├── index.css               → Styling
│   │   ├── api.js                  → API URL helper
│   │   └── components/
│   │       ├── RegistrationForm.jsx → Registration form
│   │       └── RegistrationsList.jsx → View submissions
│   ├── index.html
│   └── vite.config.js
├── backend/
│   ├── server.js                   → API server + SQL queries
│   ├── config.js                   → Database settings
│   ├── database/
│   │   ├── db.js                   → MySQL connection
│   │   └── schema.sql              → SQL table creation script
│   └── .env.example                → Environment variables template
├── PROJECT-REPORT.md               → This report
├── DEPLOYMENT.md                   → How to deploy online
└── README.md                       → Quick start guide
```

---

## 8. API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/registrations` | Save a new registration |
| GET | `/api/registrations` | Get all registrations |

---

## 9. SQL Queries Used

**Insert new registration:**
```sql
INSERT INTO registrations (first_name, last_name, email, phone_number, ...)
VALUES (?, ?, ?, ?, ...);
```

**Get all registrations:**
```sql
SELECT * FROM registrations ORDER BY created_at DESC;
```

---

## 10. How to Run Locally

### Backend
```bash
cd backend
npm install
# Copy .env.example to .env and set your MySQL password
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: **http://localhost:3000**

---

## 11. Future Enhancements

- User login and admin dashboard
- Email confirmation after registration
- Export data to Excel/CSV
- Form field validation improvements
- Mobile app version

---

## 12. Conclusion

This project successfully demonstrates a full-stack application using React for the frontend, Express for the backend API, and MySQL with SQL for data storage. The application allows users to register online, stores data reliably in a database, and provides multiple ways to view submissions — through the web app and MySQL Workbench.

---

*Report prepared for project submission and demonstration.*
