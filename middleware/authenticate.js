const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('info', 'You must be logged in to see this page!');
  res.redirect('/login');
};

module.exports = { ensureAuthenticated };
