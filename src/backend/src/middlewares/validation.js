export const validation = (validationFunction) => {
  return async (req, res, next) => {
    // callback function to check our business rules, working as middleware
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
