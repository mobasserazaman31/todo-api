const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');
const protect = require("./middlewares/authMiddleware");
const connectDB = require("../src/config/db");
const cors = require("cors")
const User = require("./models/userModel");
const cookieParser = require("cookie-parser");
require('dotenv').config();

if(process.env.NODE_ENV !== "test") connectDB();
const app = express();
app.use(cookieParser());   // 👈 Parse cookies automatically ✅

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));



app.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

app.use(express.json());
app.use('/auth', authRouter);
app.use(protect);
app.use('/todos', taskRouter);

if(process.env.NODE_ENV !== "test") app.listen(5000, () => console.log('Server running on port 5000'));

module.exports = app;



