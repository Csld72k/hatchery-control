function validateOrder(data) {
  const { sector, local, requester, problem_description } = data;

  if (!sector || typeof sector !== 'string' || !sector.trim()) {
    return 'O campo setor é obrigatório e deve ser um texto válido.';
  }

  if (!local || typeof local !== 'string' || !local.trim()) {
    return 'O campo local é obrigatório e deve ser um texto válido.';
  }

  if (!requester || typeof requester !== 'string' || !requester.trim()) {
    return 'O campo solicitante é obrigatório e deve ser um texto válido.';
  }

  if (!problem_description || typeof problem_description !== 'string' || !problem_description.trim()) {
    return 'O campo descrição do problema é obrigatório e deve ser um texto válido.';
  }

  return null;
}

module.exports = validateOrder;