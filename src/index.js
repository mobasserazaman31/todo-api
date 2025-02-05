const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');


app.use(express.json());
app.use('/todos', taskRouter);
app.use('/auth', authRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
