const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        
        return res.status(401).json({ error: "Unauthorized" });
    }    

    const decoded = jwt.verify(token, 'secret');
    req.username = decoded.username;
    next();
}

module.exports = protect;