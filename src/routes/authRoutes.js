const express = require('express');
const authRouter = express.Router();

const {register, login} = require("../controllers/authController");

authRouter.post("/register", register)
authRouter.post("/login", login)

authRouter.get("/", (req, res) => {
    res.json(users);
})

module.exports = authRouter;