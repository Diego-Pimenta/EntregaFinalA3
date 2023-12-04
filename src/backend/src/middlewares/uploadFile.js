export const uploadFile = () => {
  return async (req, res, next) => {
    try {
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        status: error.status,
        message: error.message,
        stack: error.stack,
      });
    }
  };
};
