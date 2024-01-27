const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

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

    return res.json({ status: "ok", results: results[0]?.insertId });

  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  try {

    const [users] = await mysqlConnection.query('SELECT * FROM user WHERE username = ?', [req.body.username]);
    // jwt.sign({ users }, secretKey, { expiresIn: '300s' }, (err, token) =>{
    //   token;
    // });
    var token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const storedHashedPassword = users[0].password;
    const isPasswordValid = await bcrypt.compare(req.body.password, storedHashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const userWithoutPassword = { ...users[0] };
    delete userWithoutPassword.password;

    return res.json({ status: 'success', token, user: userWithoutPassword });

  } catch (error) {
    return res.status(500).send('Internal server error')

  }
});
app.post('/additem', async (req, res) =>{
try{
  const item = await mysqlConnection.query('Insert into additem (category_name, price, description) VALUES (?, ?, ?);', [req.body.category_name, req.body.price, req.body.description])
 
  res.json(item)
}catch (error){
  console.error('Error executing query:', error);
  return res.status(500).send('Internal Server Error');
}
});

app.get('/listofitem', async (req, res) => {
  try{
    const item = await mysqlConnection.query('Select * from additem ', [req.body.category_name, req.body.price, req.body.description])
    res.json(item)

  }catch(err){
    console.error('Error executing query:', err);
    return res.status(500).send ('Internal Server Error')

  }
});



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
