function isPositiveInteger(value) {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0;
}

function isValidDate(value) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return typeof value === 'string' && dateRegex.test(value);
}

function validateOptionalText(value, fieldName) {
  if (
    value !== undefined &&
    value !== null &&
    value !== '' &&
    (typeof value !== 'string' || !value.trim())
  ) {
    return `The field "${fieldName}" must be a valid text`;
  }

  return null;
}

function validateOrder(data) {
  const {
    sector_id,
    requester_user_id,
    current_maintainer_user_id,
    action_user_id,
    location,
    service_description,
    solution_description,
    type,
    priority,
    status,
    expected_date,
    completion_date,
    status_change_reason,
    assignment_change_reason,
    reschedule_reason,
    pause_reason,
    comment_type,
    comment_text
  } = data;

  const allowedPriorities = [
    'Baixa',
    'Média',
    'Alta'
  ];
  const allowedTypes = [
    'Corretiva',
    'Preventiva'
  ];
  const allowedStatuses = [
    'Aguardando resposta',
    'Direcionado',
    'Em execução',
    'Pausado',
    'Aguardando validação',
    'Concluído',
    'Cancelado'
  ];
  const allowedCommentTypes = [
    'Solicitante',
    'Encarregado',
    'Mantenedor',
    'Sistema'
  ];

  if (!isPositiveInteger(sector_id)) {
    return 'The field "sector_id" is required and must be a positive integer.';
  }

  if (!isPositiveInteger(requester_user_id)) {
    return 'The field "requester_user_id" is required and must be a positive integer.';
  }

  if (
    current_maintainer_user_id !== undefined &&
    current_maintainer_user_id !== null &&
    current_maintainer_user_id !== '' &&
    !isPositiveInteger(current_maintainer_user_id)
  ) {
    return 'The field "current_maintainer_user_id" must be a positive integer.';
  }

  if (
    action_user_id !== undefined &&
    action_user_id !== null &&
    action_user_id !== '' &&
    !isPositiveInteger(action_user_id)
  ) {
    return `The field "action_user_id" must be a positive integer.`;
  }

  if (!location || typeof location !== 'string' || !location.trim()) {
    return 'The field "location" is required and must be a valid text.';
  }

  if (
    !service_description ||
    typeof service_description !== 'string' ||
    !service_description.trim()
  ) {
    return 'The field "service_description" is required and must be a valid text.';
  }

  const optionalTextError =
    validateOptionalText(solution_description, 'solution_description') ||
    validateOptionalText(status_change_reason, 'status_change_reason') ||
    validateOptionalText(assignment_change_reason, 'assignment_change_reason') ||
    validateOptionalText(reschedule_reason, 'reschedule_reason') ||
    validateOptionalText(pause_reason, 'pause_reason') ||
    validateOptionalText(comment_text, 'comment_text');

  if (optionalTextError) return optionalTextError;

  if (!priority || typeof priority !== 'string' || !allowedPriorities.includes(priority.trim())) {
    return 'The field "priority" is required and must be one of: Baixa, Média or Alta.';
  }

  if (
    type !== undefined &&
    type !== null &&
    type !== '' &&
    (typeof type !== 'string' || !allowedTypes.includes(type.trim()))
  ) {
    return 'The field "type" must be one of: Corretiva or Preventiva.';
  }

  if (
    status !== undefined &&
    status !== null &&
    status !== '' &&
    (typeof status !== 'string' || !allowedStatuses.includes(status.trim()))
  ) {
    return 'The field "status" contains an invalid value.';
  }

  if (
    expected_date !== undefined &&
    expected_date !== null &&
    expected_date !== '' &&
    !isValidDate(expected_date)
  ) {
    return 'The field "expected_date" must be in the format YYYY-MM-DD.';
  }

  if (
    completion_date !== undefined &&
    completion_date !== null &&
    completion_date !== '' &&
    !isValidDate(completion_date)
  ) {
    return 'The field "completion_date" must be in the format YYYY-MM-DD.';
  }

  if (
    comment_type !== undefined &&
    comment_type !== null &&
    comment_type !== '' &&
    !allowedCommentTypes.includes(comment_type)
  ) {
    return 'The field "comment_type" contains an invalid value.';
  }

  return null;
}

module.exports = validateOrder;