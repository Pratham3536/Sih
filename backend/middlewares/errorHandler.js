export const errorHandler = (err, req, res, next) => {
  console.error(`[Server Error] [${req.method}] ${req.originalUrl}:`, err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    timestamp: new Date().toISOString()
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};
