export const errorHandler = (err, req, res, next) => {
  console.error("Error in Error Handler Middleware");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};
