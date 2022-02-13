exports.errorsMiddleware = (req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.incorrectPass = req.flash("incorrectPass");
  next();
};
