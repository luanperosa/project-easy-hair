// eslint-disable-next-line consistent-return
const checkRole = role => (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === role || req.user.role === 'Admin')) {
    return next();
  }
  res.redirect('/login');
};

module.exports = checkRole;
