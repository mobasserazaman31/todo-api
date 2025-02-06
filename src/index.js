const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');
const protect = require("./middlewares/authMiddleware");

app.use(express.json());
app.use('/auth', authRouter);
app.use(protect);
app.use('/todos', taskRouter);

app.listen(5000, () => console.log('Server running on port 5000'));



