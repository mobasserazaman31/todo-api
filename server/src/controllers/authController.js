const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const users = [];

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "Username already exists. Please use a different username." });
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
        res.cookie("token", token, {
            httpOnly: true,   // Prevents JavaScript from accessing the cookie
            secure: true,    // Set to `true` if using HTTPS (you can keep `false` for HTTP during dev)
            sameSite: "None",  // Helps prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        })
        res.json({ msg: "Login successful" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
}

const logout = (req, res) => {
    res.clearCookie("token", {
      httpOnly: true, // Ensures cookie can't be accessed via JavaScript
      secure: true, 
      sameSite: "None", // Protects against CSRF
    });
  
    return res.status(200).json({ message: "Logged out successfully" });
  };
  


module.exports = { register, login, logout };