const { sql } = require('../database/connection');

async function createOrderService({
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
}) {
  await sql.query`
    INSERT INTO service_orders (
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
    )
    VALUES (
      ${sector_id},
      ${requester_user_id},
      ${current_maintainer_user_id || null},
      ${location},
      ${service_description},
      ${solution_description || null},
      ${type || null},
      ${priority},
      ${status || 'Aguardando resposta'},
      ${expected_date || null},
      ${completion_date || null}
    )
  `;
}

async function getOrdersService(filters = {}) {
  const {
    sector,
    requester,
    maintainer,
    location,
    status,
    priority,
    type,
    sortBy = 'id',
    order = 'asc'
  } = filters;

  const allowedSortFields = {
    id: 'so.id',
    request_date: 'so.request_date',
    expected_date: 'so.expected_date',
    completion_date: 'so.completion_date',
    created_at: 'so.created_at'
  };

  const allowedOrderValues = ['asc', 'desc'];

  const safeSortBy = allowedSortFields[sortBy] || 'so.id';
  const safeOrder = allowedOrderValues.includes(order.toLowerCase())
    ? order.toLowerCase()
    : 'asc';

  let query = `
    SELECT
      so.id,
      so.sector_id,
      s.name AS sector_name,
      so.requester_user_id,
      requester_user.name AS requester_name,
      so.current_maintainer_user_id,
      maintainer_user.name AS maintainer_name,
      so.location,
      so.request_date,
      so.service_description,
      so.solution_description,
      so.type,
      so.priority,
      so.status,
      so.expected_date,
      so.completion_date,
      so.service_start_at,
      so.service_end_at,
      so.created_at,
      so.updated_at
    FROM service_orders so
    INNER JOIN sectors s ON s.id = so.sector_id
    INNER JOIN users requester_user ON requester_user.id = so.requester_user_id
    LEFT JOIN users maintainer_user ON maintainer_user.id = so.current_maintainer_user_id
    WHERE 1 = 1
  `;

  const request = new sql.Request();

  if (sector) {
    query += ' AND s.name LIKE @sector';
    request.input('sector', sql.VarChar, `%${sector}%`);
  }

  if (requester) {
    query += ' AND requester_user.name LIKE @requester';
    request.input('requester', sql.VarChar, `%${requester}%`);
  }

  if (maintainer) {
    query += ' AND maintainer_user.name LIKE @maintainer';
    request.input('maintainer', sql.VarChar, `%${maintainer}%`);
  }

  if (location) {
    query += ' AND so.location LIKE @location';
    request.input('location', sql.VarChar, `%${location}%`);
  }

  if (status) {
    query += ' AND so.status LIKE @status';
    request.input('status', sql.VarChar, `%${status}%`);
  }

  if (priority) {
    query += ' AND so.priority LIKE @priority';
    request.input('priority', sql.VarChar, `%${priority}%`);
  }

  if (type) {
    query += ' AND so.type LIKE @type';
    request.input('type', sql.VarChar, `%${type}%`);
  }

  query += ` ORDER BY ${safeSortBy} ${safeOrder}`;

  const result = await request.query(query);

  return result.recordset;
}

async function getOrderByIdService(id) {
  const request = new sql.Request();
  request.input('id', sql.Int, Number(id));

  const result = await request.query(`
    SELECT
      so.id,
      so.sector_id,
      s.name AS sector_name,
      so.requester_user_id,
      requester_user.name AS requester_name,
      so.current_maintainer_user_id,
      maintainer_user.name AS maintainer_name,
      so.location,
      so.request_date,
      so.service_description,
      so.solution_description,
      so.type,
      so.priority,
      so.status,
      so.expected_date,
      so.completion_date,
      so.service_start_at,
      so.service_end_at,
      so.created_at,
      so.updated_at
    FROM service_orders so
    INNER JOIN sectors s ON s.id = so.sector_id
    INNER JOIN users requester_user ON requester_user.id = so.requester_user_id
    LEFT JOIN users maintainer_user ON maintainer_user.id = so.current_maintainer_user_id
    WHERE so.id = @id
  `);

  return result.recordset[0];
}

async function updateOrderService(
  id,
  {
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
  }
) {
  const result = await sql.query`
    UPDATE service_orders
    SET
      sector_id = ${sector_id},
      requester_user_id = ${requester_user_id},
      current_maintainer_user_id = ${current_maintainer_user_id || null},
      location = ${location},
      service_description = ${service_description},
      solution_description = ${solution_description || null},
      type = ${type || null},
      priority = ${priority},
      status = ${status},
      expected_date = ${expected_date || null},
      completion_date = ${completion_date || null},
      updated_at = SYSDATETIME()
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
};