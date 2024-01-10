const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const bcrypt = require('bcrypt');




require('dotenv').config()
const port = process.env.PORT

const cors = require('cors')
const bodyParser = require('body-parser')

// const connect = require('./db/connect')
// connect()

app.use(bodyParser.json())
app.use(cors())

const mysqlConnection = require('./mysqldatabase');

app.get('/', async (req, res) => {
  try {
    // Example query using the connection pool
    const [results] = await mysqlConnection.execute('SELECT * From abc');
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// if username is already in the db then throw username already exxist
// try to implement password hashing (crypto.js)
// save the data in the redux of the login 
app.post('/register', async (req, res) => {
  try {
    const duplicateUser = await mysqlConnection.query('SELECT * FROM user WHERE username = ?', [req.body.username]);
    console.log(duplicateUser)
    if (duplicateUser[0].length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const results = await mysqlConnection.execute('INSERT INTO user (username, email, address, phoneNumber, password) VALUES (?, ?, ?, ?, ?);',
      [req.body.username, req.body.address, req.body.email, req.body.phoneNumber, hashedPassword]);

    res.json({ status: "ok", results: results[0]?.insertId });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const [users] = await mysqlConnection.query('SELECT * FROM user WHERE username = ?', [req.body.username]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const storedHashedPassword = users[0].password;
    const isPasswordValid = await bcrypt.compare(req.body.password, storedHashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If you reach this point, the login is successful
    // You can now proceed with your authentication logic

    // Optionally, you can remove the password from the response
    const userWithoutPassword = { ...users[0] };
    delete userWithoutPassword.password;

    res.json({ status: 'success', user: userWithoutPassword });

  } catch (error) {
    res.status(500).send('Internal server error')

  }
});



// const registerRouter = require('./routes/registerRouter');
// const loginRouter = require('./routes/loginRouter');


// app.use(registerRouter)
// app.use(loginRouter)


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
