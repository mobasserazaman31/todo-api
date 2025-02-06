const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

const register = async ( req, res) => {
    const {username, password} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = { username, password: hashedPassword};
        users.push(newUser);

        res.status(201).json({msg: "Registration successful"});
    }catch(error){
        res.status(500).json({msg: "Server error", error});
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = users.find(user => user.username === username);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
        const token = jwt.sign({username}, "secret");
        res.json({token});
    }catch(error){
        res.status(500).json({msg: "Server error", error});
    }
}

module.exports = {register, login};