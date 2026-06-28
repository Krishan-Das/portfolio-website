import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

export async function authenticate(req, res, next) {
  try {
    // --- Get authorization header ---
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // --- Extract access token ---
    const accessToken = authHeader.split(" ")[1];

    // --- Verify access token ---
    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);

    // --- Check session ---
    const session = await sessionModel.findOne({
      _id: decoded.sessionId,
      user: decoded.id,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Session expired or revoked",
      });
    }

    // --- Store user data for next middleware/controller ---
    req.user = {
      id: decoded.id,
      role: decoded.role,
      sessionId: decoded.sessionId,
    };

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired access token",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}