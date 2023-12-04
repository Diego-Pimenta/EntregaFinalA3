export const errorHandler = (err, req, res, next) => {
  console.error("Middleware Error Handling");
  const errStatus = err.status || 500; // if no status code is provided, default to 500 (internal server error)
  const errMsg = err.message || "Something broke!";
  return res.status(500).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
};
