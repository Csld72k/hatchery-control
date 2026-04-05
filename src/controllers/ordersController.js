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
    ser.status(500).send('Errror fetching orderes.');
  }
}

module.exports = {
  createOrder,
  getOrders
};