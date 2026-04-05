const { createOrderService, getOrdersService, getOrderByIdService, updateOrderService, deleteOrderService } = require('../services/ordersService');

// Create order
async function createOrder(req, res) {
  try {
    const { sector, local, requester, problem_description } = req.body;

    await createOrderService({ sector, local, requester, problem_description });

    res.status(201).send('Order saved successfully ✅.');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving order.');
  }

}

// GET orders
async function getOrders(req, res) {
  try {
    const orders = await getOrdersService();

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching orders.');
  }
}

// GET order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await getOrderByIdService(id);

    if (!order) {
      return res.status(404).send('Order not found.');
    }

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching order.');
  }
}

// UPDATE order
async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { sector, local, requester, problem_description } = req.body;

    const rowsAffected = await updateOrderService(id, { sector, local, requester, problem_description });

    if (rowsAffected === 0) {
      return res.status(404).send('Order not found.');
    }

    res.send('Order updated successfully ✅.');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order.');
  }
}

// DELETE order
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const rowsAffected = await deleteOrderService(id);

    if (rowsAffected === 0) {
      return res.status(404).send('Order not found.');
    }

    res.send('Order deleted successfully 🗑️.');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting order.');
  }
}

// Validate order data


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};