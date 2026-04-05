const express = require('express');
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
})
