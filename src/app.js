const express = require('express');
require('dotenv').config();

const app = express();
const { connectDB } = require('./database/connection');
const ordersRoutes = require('./routes/ordersRoutes');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

// Connect to the database
connectDB();

app.use(express.json());

// Initial route
app.get('/', (req, res) => {
  res.send('API running 🚀');
});

// Orders routes
app.use(ordersRoutes);

// Handle route not found errors (404)
app.use(notFoundMiddleware);

// Handle global errors (500)
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀.`);
});
