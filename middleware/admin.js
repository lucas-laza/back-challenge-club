const admin = (req, res, next) => {
  console.log(req.userData);
  if (!req.userData || !req.userData.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = admin;