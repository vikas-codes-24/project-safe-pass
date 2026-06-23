const express = require("express");
const jwt = require("jsonwebtoken");
function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "unAuthorized" });
  }
  try {
    const decode = jwt.verify(authHeader, "my-secret-key");
    req.user = decode;
    next();
  } catch {
    return res.status(401).json({ message: "unauthorized" });
  }
}
module.exports = { checkAuth };
