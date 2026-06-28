export function isAdmin(req, res, next) {

  // --- Check whether user is admin ---
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden. Admin access required.",
    });
  }

  next();
}