/**
 * Authentication Middleware
 * Extracts JWT token from cookies, verifies it, and attaches user to req.user
 */

const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");

async function authMiddleware(req, res, next) {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    // Check if token is blacklisted (for logout)
    const isBlacklisted = await tokenBlackListModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token is blacklisted. Please login again.",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user data to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    
    // Handle different JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired. Please login again.",
      });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
      });
    }
    
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
}

module.exports = authMiddleware;
