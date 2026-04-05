const express = require('express');
require('dotenv').config();

const app = express();
const { connectDB } = require('./database/connection');
const ordersRoutes = require('./routes/ordersRoutes');

// Connect to the database
connectDB();

app.use(express.json());

// Initial route
app.get('/', (req, res) => {
  res.send('API running 🚀');
});

// Orders routes
app.use(ordersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀.`);
});
