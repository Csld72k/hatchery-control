const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const orderValidationMiddleware = require('../middlewares/orderValidationMiddleware');

router.post('/orders', orderValidationMiddleware, ordersController.createOrder);
router.get('/orders', ordersController.getOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.put('/orders/:id', orderValidationMiddleware, ordersController.updateOrder);
router.delete('/orders/:id', ordersController.deleteOrder);

module.exports = router;