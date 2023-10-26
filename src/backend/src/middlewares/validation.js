export const validation = (validationFunction) => {
  async (req, res, next) => {
    const errors = validationFunction(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};
