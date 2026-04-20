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
  const initialStatus = status || 'Aguardando resposta';

  const result = await sql.query`
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
  OUTPUT INSERTED.id
  VALUES (
    ${sector_id},
    ${requester_user_id},
    ${current_maintainer_user_id || null},
    ${location},
    ${service_description},
    ${solution_description || null},
    ${type || null},
    ${priority},
    ${initialStatus},
    ${expected_date || null},
    ${completion_date || null}
  )
`;

  const createdOrderId = result.recordset[0].id;

  await createStatusHistory({
    service_order_id: createdOrderId,
    old_status: null,
    new_status: initialStatus,
    changed_by_user_id: requester_user_id,
    reason: 'Ordem de serviço criada.'
  });

  return createdOrderId;
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
    completion_date,
    action_user_id,
    status_change_reason,
    assignment_change_reason,
    reschedule_reason,
    pause_reason,
    comment_type,
    comment_text,
    existingOrder
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

  const rowsAffected = result.rowsAffected[0];

  if (rowsAffected === 0) {
    return 0;
  }

  const oldStatus = existingOrder.status;
  const newStatus = status;

  if (newStatus && newStatus !== oldStatus) {
    await createStatusHistory({
      service_order_id: Number(id),
      old_status: oldStatus,
      new_status: newStatus,
      changed_by_user_id: action_user_id,
      reason: status_change_reason || null
    });
  }

  const oldMaintainerId = existingOrder.current_maintainer_user_id;
  const newMaintainerId = current_maintainer_user_id;

  if (newMaintainerId && Number(newMaintainerId) !== Number(oldMaintainerId)) {
    await createAssignmentHistory({
      service_order_id: Number(id),
      old_maintainer_user_id: oldMaintainerId,
      new_maintainer_user_id: newMaintainerId,
      changed_by_user_id: action_user_id,
      reason: assignment_change_reason || null
    });
  }

  const oldExpectedDate = formatDateOnly(existingOrder.expected_date);
  const newExpectedDate = formatDateOnly(expected_date);

  if (newExpectedDate && newExpectedDate !== oldExpectedDate) {
    await createRescheduleHistory({
      service_order_id: Number(id),
      old_expected_date: oldExpectedDate,
      new_expected_date: newExpectedDate,
      changed_by_user_id: action_user_id,
      reason: reschedule_reason
    });
  }

  if (newStatus === 'Pausado' && oldStatus !== 'Pausado') {
    await createPauseHistory({
      service_order_id: Number(id),
      paused_by_user_id: action_user_id,
      pause_reason
    });
  }

  if (comment_text && comment_type) {
    await createOrderComment({
      service_order_id: Number(id),
      user_id: action_user_id,
      comment_type,
      comment_text
    });
  }

  return rowsAffected;
}

async function deleteOrderService(id) {
  const result = await sql.query`
    DELETE FROM service_orders
    WHERE id = ${id}
  `;

  return result.rowsAffected[0];
}

async function createStatusHistory({
  service_order_id,
  old_status,
  new_status,
  changed_by_user_id,
  reason
}) {
  await sql.query`
    INSERT INTO service_order_status_history (
      service_order_id,
      old_status,
      new_status,
      changed_by_user_id,
      reason
    )
    VALUES (
      ${service_order_id},
      ${old_status},
      ${new_status},
      ${changed_by_user_id},
      ${reason || null}
    )
  `;
}

async function createAssignmentHistory({
  service_order_id,
  old_maintainer_user_id,
  new_maintainer_user_id,
  changed_by_user_id,
  reason
}) {
  await sql.query`
    INSERT INTO service_order_assignments (
      service_order_id,
      old_maintainer_user_id,
      new_maintainer_user_id,
      changed_by_user_id,
      reason
    )
    VALUES (
      ${service_order_id},
      ${old_maintainer_user_id || null},
      ${new_maintainer_user_id},
      ${changed_by_user_id},
      ${reason || null}
    )
  `;
}

async function createRescheduleHistory({
  service_order_id,
  old_expected_date,
  new_expected_date,
  changed_by_user_id,
  reason
}) {
  await sql.query`
    INSERT INTO service_order_reschedules (
      service_order_id,
      old_expected_date,
      new_expected_date,
      changed_by_user_id,
      reason
    )
    VALUES (
      ${service_order_id},
      ${old_expected_date || null},
      ${new_expected_date},
      ${changed_by_user_id},
      ${reason}
    )
  `;
}

async function createPauseHistory({
  service_order_id,
  paused_by_user_id,
  pause_reason
}) {
  await sql.query`
    INSERT INTO service_order_pauses (
      service_order_id,
      paused_by_user_id,
      pause_reason
    )
    VALUES (
      ${service_order_id},
      ${paused_by_user_id},
      ${pause_reason}
    )
  `;
}

async function createOrderComment({
  service_order_id,
  user_id,
  comment_type,
  comment_text
}) {
  await sql.query`
    INSERT INTO service_order_comments (
      service_order_id,
      user_id,
      comment_type,
      comment_text
    )
    VALUES (
      ${service_order_id},
      ${user_id},
      ${comment_type},
      ${comment_text}
    )
  `;
}

function formatDateOnly(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    return value.slice(0, 10);
  }

  return value.toISOString().slice(0, 10);
}

module.exports = {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderService,
  deleteOrderService
};