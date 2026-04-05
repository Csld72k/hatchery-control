const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/orders', ordersController.createOrder);
router.get('/orders', ordersController.getOrders);

module.exports = router;