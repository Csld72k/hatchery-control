const { createOrderService, getOrdersService, getOrderByIdService, updateOrderService, deleteOrderService } = require('../services/ordersService');

// Create order
async function createOrder(req, res) {
  try {
    const { sector, local, requester, problem_description } = req.body;

    await createOrderService({ sector, local, requester, problem_description });

    res.status(201).json({ message: 'Order saved successfully ✅.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving order.' });
  }

}

// GET orders
async function getOrders(req, res) {
  try {
    const filters = req.query; // Get filters from query parameters

    const orders = await getOrdersService(filters);

    res.status(200).json({ message: 'Orders fetched successfully.', data: orders });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders.' });
  }
}

// GET order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await getOrderByIdService(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order fetched successfully.', data: order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching order.' });
  }
}

// UPDATE order
async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { sector, local, requester, problem_description } = req.body;

    const rowsAffected = await updateOrderService(id, { sector, local, requester, problem_description });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({ message: 'Order updated successfully ✅.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order.' });
  }
}

// DELETE order
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const rowsAffected = await deleteOrderService(id);

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order deleted successfully 🗑️.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting order.' });
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