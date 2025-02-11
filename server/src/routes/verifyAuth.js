// server/routes/auth.js
const express = require("express");
const verifyAuth = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

verifyAuth.get("/", async (req, res) => {
  console.log(req.headers.cookie);
  const token = req.cookies.token; // Read token from cookies

  if (!token) return res.json({ isAuthenticated: false });

  try {
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({username: decoded.username});
    res.json({ isAuthenticated: true, user: {username: user.username, tasks: user.tasks} });
  } catch (error) {
    res.json({ isAuthenticated: false });
  }
});

module.exports = verifyAuth;
