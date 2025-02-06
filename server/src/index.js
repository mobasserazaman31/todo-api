const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');
const protect = require("./middlewares/authMiddleware");
const connectDB = require("../src/config/db");
const User = require("./models/userModel");

connectDB();
const app = express();

app.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

app.use(express.json());
app.use('/auth', authRouter);
app.use(protect);
app.use('/todos', taskRouter);

app.listen(3000, () => console.log('Server running on port 5000'));



