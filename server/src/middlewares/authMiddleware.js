const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'secret');
    req.username = decoded.username;
    next();
}

module.exports = protect;