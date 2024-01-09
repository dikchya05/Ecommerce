const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);



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
app.post('/register', async (req, res) => {
  try {
    const sql = 'INSERT INTO user (username, email, address, phoneNumber, password) VALUES (?, ?, ?, ?, ?)';
    const values = [req.body.username, req.body.address, req.body.email, req.body.phoneNumber, req.body.password];
    console.log(values)
    const results = await mysqlConnection.execute(sql, values);
    console.log(results[0])
    res.json({ status: "ok", results: results[0]?.insertId });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});

app.post('/login', async (req, res) => {
  try {
    const addvalues = 'select * from user where username = ? and password = ?;'
    const results = await mysqlConnection.execute(addvalues, [req.body.username, req.body.password]);
    console.log(results[0])
    if (results?.[0]?.length > 0) {
      const newResult = [...results[0]]
      delete newResult?.[0]?.password;
      res.json({ status: "success", results: newResult });
    } else {
      res.status(404).json({ error: 'no data found' });
    }
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
