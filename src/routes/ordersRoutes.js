const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const orderValidationMiddleware = require('../middlewares/orderValidationMiddleware');
const validateIdMiddleware = require('../middlewares/validateIdMiddleware');

router.post('/orders', orderValidationMiddleware, ordersController.createOrder);
router.get('/orders', ordersController.getOrders);
router.get('/orders/:id', validateIdMiddleware, ordersController.getOrderById);
router.put('/orders/:id', validateIdMiddleware, orderValidationMiddleware, ordersController.updateOrder);
router.delete('/orders/:id', validateIdMiddleware, ordersController.deleteOrder);

module.exports = router;