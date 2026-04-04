const sql = require('mssql');

const config = {
  user: 'Admin',
  password: '1234asdf',
  server: 'localhost',
  database: 'hatchery_control',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server ✅');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = {
  sql,
  connectDB
};
