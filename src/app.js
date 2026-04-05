const express = require('express');
const app = express();
const { sql, connectDB } = require('./database/connection');
const ordersController = require('./controllers/ordersController');

// Connect to the database
connectDB();

app.use(express.json());

app.post('/orders', ordersController.createOrder);
app.get('/orders', ordersController.getOrders);


app.listen(3000, () => {
  console.log('Server running on port 3000');
})
