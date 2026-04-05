const { sql } = require('../database/connection');

async function createOrderService({ sector, local, requester, problem_description }) {
  await sql.query`
  INSERT INTO service_orders (sector, local, requester, problem_description)
  VALUES (${sector},  ${local}, ${requester}, ${problem_description})
  `;
}

async function getOrdersService() {
  const result = await sql.query`
  SELECT * FROM service_orders
  `;

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