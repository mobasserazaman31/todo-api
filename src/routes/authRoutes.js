const express = require('express');
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

authRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { username, hashedPassword};

    users.push(newUser);
    res.json(newUser)
})

authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
  
    console.log(user);
    const isMatch = await bcrypt.compare( password, user.hashedPassword);
    if(isMatch){
        const token = jwt.sign({username}, 'secret');
        return res.json({token});

    }
    res.json({message: "Incorrect"})


})

authRouter.get("/", (req, res) => {
    res.json(users);
})

module.exports = authRouter;