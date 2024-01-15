// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: "Please login" });
    }
  } catch (err) {
    res.status(500).json({ message: "Middleware error" });
  }
};

module.exports = { isAuthenticated }
