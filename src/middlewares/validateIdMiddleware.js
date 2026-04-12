function validateIdMiddleware(req, res, next) {
  const { id } = req.params;

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({ message: 'Invalid ID. It must be a positive integer.' });
  }

  next();
}

module.exports = validateIdMiddleware;