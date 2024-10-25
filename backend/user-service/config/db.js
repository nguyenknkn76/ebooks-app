const { Pool } = require('pg');

// Create a connection pool to PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'userdb',
    password: '123456',
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;
