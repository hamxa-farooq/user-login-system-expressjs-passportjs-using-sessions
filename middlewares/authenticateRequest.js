const authenticateRequest = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/user/login');
  }
}

module.exports = authenticateRequest;
