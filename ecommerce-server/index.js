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


app.post('/register', async (req, res) => {
  try {
    const { username, address, email, phoneNumber, password, confirmPassword } = req.body;
    
    // Example query using the connection pool
    const [results] = await mysqlConnection.execute('INSERT INTO user (username, email, address, phoneNumber, password, confirmPassword) VALUES (?, ?, ?, ?, ?, ?)'
    [username, address, email, parseInt(phoneNumber), parseInt(password), parseInt(confirmPassword)]
    );
    console.log("results", results)
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }

});



// const registerRouter = require('./routes/registerRouter');
// const loginRouter = require('./routes/loginRouter');


// app.use(registerRouter)
// app.use(loginRouter)


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
