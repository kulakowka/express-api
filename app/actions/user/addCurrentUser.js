export default (req, res, next) => {
  res.locals.currentUser = req.user
  next()
}
