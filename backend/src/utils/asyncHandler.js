const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandler };

// When writing asynchronous route handlers (using async/await), if an error occurs, it needs to be caught and handled properly. Otherwise, the app might crash or hang. Using asyncHandler, you avoid writing repetitive try-catch blocks in every route.
