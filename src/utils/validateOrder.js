function validateOrder(data) {
  const { sector, local, requester, problem_description } = data;

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

  return null;
}

module.exports = validateOrder;