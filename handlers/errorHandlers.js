//file to package up all error handlers



//this replaces the need for a try catch if we were to set up for passing data to and from a database.
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    // return fn(req, res, next).catch(next);
    return "You had an error";
  };
};


//our 404 error handler
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

//our general error handler if other fail
exports.handleErrors = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};
