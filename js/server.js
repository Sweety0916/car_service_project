const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Perform login logic, check email and password against the database
  // For simplicity, let's assume a valid login for any non-empty email and password
  if (email && password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Route to handle user logout
app.post('/logout', (req, res) => {
  // Perform logout logic if needed
  res.json({ success: true, message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Route to handle contact form submission
app.post('/submitContactForm', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Insert the form data into the 'contacts' table in the database
  const sql = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error inserting contact form data:', err);
      res.status(500).json({ success: false, message: 'Error submitting contact form' });
    } else {
      res.json({ success: true, message: 'Contact form submitted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
