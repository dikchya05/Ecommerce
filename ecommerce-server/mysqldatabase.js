const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'employee',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Establish a connection to the database
// connection.connect((err) => {
if (connection) {
    console.log('Connected to MySQL database');
} else {
    console.error('Error connecting to MySQL');
}
// });

// Export the pool for use in other modules
module.exports = connection.promise();
