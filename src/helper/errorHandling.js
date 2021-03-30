const handling = {
  error500: (err, next) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  },
};

export default handling;
