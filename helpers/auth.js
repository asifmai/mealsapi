module.exports.ensureAuthenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role == 'admin') {
      return next();
    } else {
      req.flash('error_msg', 'You need Admin privileges to access this page');
      res.redirect('/dashboard/login');
    }
  } else {
    req.flash('error_msg', 'Please Signin First...');
    res.redirect('/dashboard/login');
  }
}
