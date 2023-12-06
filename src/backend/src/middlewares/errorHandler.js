export const errorHandler = (err, req, res, next) => {
  console.error("Middleware Error Handling");
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Internal Server Error";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    // stack: err.stack,
  });
};
