function validateOrder(data) {
  const { sector, local, requester, problem_description, status, priority, type, request_date } = data;

  if (!sector || typeof sector !== 'string' || !sector.trim()) {
    return 'The field "sector" is required and must be a valid text.';
  }

  if (!local || typeof local !== 'string' || !local.trim()) {
    return 'The field "local" is required and must be a valid text.';
  }

  if (!requester || typeof requester !== 'string' || !requester.trim()) {
    return 'The field "requester" is required and must be a valid text.';
  }

  if (!problem_description || typeof problem_description !== 'string' || !problem_description.trim()) {
    return 'The field "problem_description" is required and must be a valid text.';
  }

  if (status !== undefined && (typeof status !== 'string' || !status.trim())) {
    return 'The field "status" must be a valid text.';
  }

  if (priority !== undefined && (typeof priority !== 'string' || !priority.trim())) {
    return 'The field "priority" must be a valid text.';
  }

  if (type !== undefined && (typeof type !== 'string' || !type.trim())) {
    return 'The field "type" must be a valid text.';
  }

  if (request_date !== undefined) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (typeof request_date !== 'string' || !dateRegex.test(request_date)) {
      return 'The field "request_date" must be in the format YYYY-MM-DD.';
    }
  }

  return null;
}

module.exports = validateOrder;