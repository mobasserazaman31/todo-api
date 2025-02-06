const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const users = [];

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password: hashedPassword });
        const document = await newUser.save();
        res.status(201).json({ msg: "Registration successful" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "Username or password is incorrect" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        const token = jwt.sign({ username }, "secret");
        res.json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
}



module.exports = { register, login };