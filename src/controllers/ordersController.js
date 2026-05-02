function formatDateOnly(value) {
  if (!value) return null;

  if (typeof value === 'string') return value.slice(0, 10);

  return value.toISOString().slice(0, 10);
}

const {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderService,
  cancelOrderService
} = require('../services/ordersService');

// Create order
async function createOrder(req, res) {
  try {
    const {
      sector_id,
      requester_user_id,
      current_maintainer_user_id,
      location,
      service_description,
      solution_description,
      type,
      priority,
      status,
      expected_date,
      completion_date
    } = req.body;

    await createOrderService({
      sector_id: Number(sector_id),
      requester_user_id: Number(requester_user_id),
      current_maintainer_user_id:
        current_maintainer_user_id === undefined ||
          current_maintainer_user_id === null ||
          current_maintainer_user_id === ''
          ? null
          : Number(current_maintainer_user_id),
      location,
      service_description,
      solution_description,
      type,
      priority,
      status,
      expected_date,
      completion_date
    });

    res.status(201).json({ message: 'Order saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving order.' });
  }
}

// Get orders
async function getOrders(req, res) {
  try {
    const filters = req.query;

    const orders = await getOrdersService(filters);

    res.status(200).json({
      message: 'Orders fetched successfully.',
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders.' });
  }
}

// Get order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await getOrderByIdService(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({
      message: 'Order fetched successfully.',
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching order.' });
  }
}

// Update order
async function updateOrder(req, res) {
  try {
    const { id } = req.params;

    const existingOrder = await getOrderByIdService(id);

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const {
      sector_id,
      requester_user_id,
      current_maintainer_user_id,
      location,
      service_description,
      solution_description,
      type,
      priority,
      status,
      expected_date,
      completion_date,
      action_user_id,
      status_change_reason,
      assignment_change_reason,
      reschedule_reason,
      pause_reason,
      comment_type,
      comment_text
    } = req.body;

    if (
      !action_user_id ||
      !Number.isInteger(Number(action_user_id)) ||
      Number(action_user_id) <= 0
    ) {
      return res.status(400).json({
        message: 'The field "action_user_id" is required for updating an order.'
      });
    }

    const oldExpectedDate = formatDateOnly(existingOrder.expected_date);

    const newExpectedDate =
      expected_date !== undefined && expected_date !== null && expected_date !== ''
        ? expected_date
        : oldExpectedDate;

    if (newExpectedDate !== oldExpectedDate && !reschedule_reason?.trim()) {
      return res.status(400).json({
        message: 'The field "reschedule_reason" is required when expected_date changes.'
      });
    }

    if (
      status === 'Pausado' &&
      existingOrder.status !== 'Pausado' &&
      !pause_reason?.trim()
    ) {
      return res.status(400).json({
        message: 'The field "pause_reason" is required when pausing an order.'
      });
    }

    const updatedOrderData = {
      sector_id: Number(sector_id),
      requester_user_id: Number(requester_user_id),
      current_maintainer_user_id:
        current_maintainer_user_id !== undefined
          ? current_maintainer_user_id === null || current_maintainer_user_id === ''
            ? null
            : Number(current_maintainer_user_id)
          : existingOrder.current_maintainer_user_id,
      location,
      service_description,
      solution_description:
        solution_description !== undefined
          ? solution_description
          : existingOrder.solution_description,
      type: type !== undefined ? type : existingOrder.type,
      priority,
      status: status !== undefined ? status : existingOrder.status,
      expected_date:
        expected_date !== undefined ? expected_date : existingOrder.expected_date,
      completion_date:
        completion_date !== undefined ? completion_date : existingOrder.completion_date,
      action_user_id: Number(action_user_id),
      status_change_reason,
      assignment_change_reason,
      reschedule_reason,
      pause_reason,
      comment_type,
      comment_text,
      existingOrder
    };

    const rowsAffected = await updateOrderService(id, updatedOrderData);

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order.' });
  }
}

// Cancel order
async function cancelOrder(req, res) {
  try {
    const { id } = req.params;
    const { action_user_id, cancellation_reason } = req.body;

    if (!action_user_id || !Number.isInteger(Number(action_user_id)) || Number(action_user_id) <= 0) {
      return res.status(400).json({ message: 'The field "action_user_id" is required for canceling an order.' });
    }

    if (!cancellation_reason || typeof cancellation_reason !== 'string' || !cancellation_reason.trim()) {
      return res.status(400).json({ message: 'The field "cancellation_reason" is required for canceling an order.' });
    }

    const existingOrder = await getOrderByIdService(id);

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (existingOrder.status === 'Cancelado') {
      return res.status(400).json({ message: 'Order is already cancelled.' });
    }

    if (existingOrder.status === 'Concluído') {
      return res.status(400).json({ message: 'Completed orders cannot be cancelled' });
    }

    const rowsAffected = await cancelOrderService(id, { action_user_id: Number(action_user_id), cancellation_reason, existingOrder });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order cancelled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling order.' });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  cancelOrder
};