const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'secret');
    next();
}

module.exports = protect;