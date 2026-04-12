const { sql } = require('../database/connection');

async function createOrderService({ sector, local, requester, problem_description }) {
  await sql.query`
  INSERT INTO service_orders (sector, local, requester, problem_description)
  VALUES (${sector},  ${local}, ${requester}, ${problem_description})
  `;
}

// Get orders with optional filters
async function getOrdersService(filters = {}) {
  const { sector, requester, local, sortBy = 'id', order = 'asc' } = filters;

  const allowedSortFields = ['id', 'request_date'];
  const allowedOrderValues = ['asc', 'desc'];

  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'id';
  const safeOrder = allowedOrderValues.includes(order.toLowerCase()) ? order.toLowerCase() : 'asc';

  let query = 'SELECT * FROM service_orders WHERE 1=1';
  const request = new sql.Request();

  if (sector) {
    query += ' AND sector LIKE @sector';
    request.input('sector', sql.VarChar, `%${sector}%`);
  }

  if (requester) {
    query += ' AND requester LIKE @requester';
    request.input('requester', sql.VarChar, `%${requester}%`);
  }

  if (local) {
    query += ' AND local LIKE @local';
    request.input('local', sql.VarChar, `%${local}%`);
  }

  query += ` ORDER BY ${safeSortBy} ${safeOrder}`;

  const result = await request.query(query);

  return result.recordset;
}

async function getOrderByIdService(id) {
  const result = await sql.query`
  SELECT * FROM service_orders
  WHERE id = ${id}
  `;

  return result.recordset[0];
}

async function updateOrderService(id, { sector, local, requester, problem_description }) {
  const result = await sql.query`
  UPDATE service_orders
  SET
    sector = ${sector},
    local = ${local},
    requester = ${requester},
    problem_description = ${problem_description}
  WHERE id = ${id}
  `;

  return result.rowsAffected[0];
}

async function deleteOrderService(id) {
  const result = await sql.query`
  DELETE FROM service_orders
  WHERE id = ${id}
  `;

  return result.rowsAffected[0];
}

module.exports = {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderService,
  deleteOrderService
}