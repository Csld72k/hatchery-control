const validateOrder = require('../utils/validateOrder');

function orderValidationMiddleware(req, res, next) {
  const validationError = validateOrder(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  next();
}

module.exports = orderValidationMiddleware;