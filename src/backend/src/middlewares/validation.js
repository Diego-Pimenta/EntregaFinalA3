export const validation = (validationFunction) => {
  return async (req, res, next) => {
    try {
      validationFunction(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        errors: error,
      });
    }
  };
};
