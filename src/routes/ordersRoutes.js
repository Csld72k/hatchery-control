const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/orders', ordersController.createOrder);
router.get('/orders', ordersController.getOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.put('/orders/:id', ordersController.updateOrder);

module.exports = router;