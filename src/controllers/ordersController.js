const { sql } = require('../database/connection');

// Create order
async function createOrder(req, res) {
  try {
    const {
      sector,
      local,
      requester,
      problem_description
    } = req.body;

    await sql.query`
    INSERT INTO service_orders (sector, local, requester, problem_description)
    VALUES (${sector}, ${local}, ${requester}, ${problem_description})
    `;

    res.send('Order saved successfully ✅');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving order.');
  }

}

// GET orders
async function getOrders(req, res) {
  try {
    const result = await sql.query`
    SELECT * FROM service_orders
    `;

    res.json(result.recordset);

  } catch (error) {
    console.error(error);
    ser.status(500).send('Error fetching orders.');
  }
}

// GET order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const result = await sql.query`
    SELECT * FROM service_orders
    WHERE id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).send('Order not found.');
    }

    res.json(result.recordset[0]);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching order.');
  }
}

// UPDATE order
async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const {
      sector,
      local,
      requester,
      problem_description
    } = req.body;

    const result = await sql.query`
    UPDATE service_orders
    SET
      sector = ${sector},
      local = ${local},
      requester = ${requester},
      problem_description = ${problem_description}
    WHERE id = ${id}
    `;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Order not found.');
    }

    res.send('Order updated successfully ✅');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order.');
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder
};