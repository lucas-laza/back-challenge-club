const admin = (req, res, next) => {
  if (!req.userData || !req.userData.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = admin;