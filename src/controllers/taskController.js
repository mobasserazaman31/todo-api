const User = require("../models/userModel");

const createTask = async (req, res) => {
    const username = req.username;
    const user = await User.findOne({username});
    const { title, completed = false } = req.body;
    const newTodo = { title, completed};
    user.tasks.push(newTodo);
    await user.save();
    res.status(201).json(user);
}

const updateTask = async (req, res) => {
    const username = req.username;
    const user = await User.findOne({username});
    const todo = user.tasks.find(task => task._id == req.params.id);
    const { title, completed } = req.body;
    todo.title = title;
    todo.completed = completed;
    await user.save();
    res.status(201).json(todo);
}

const deleteTask = async (req, res) => {
    const username = req.username;
    const user = await User.findOne({username});
    const index = user.tasks.findIndex(task => task._id == req.params.id);
    user.tasks.splice(index, 1);
    await user.save();
    res.json(user);
}

const getTasks = async (req, res) => {
    const username = req.username;
    const user = await User.findOne({username});
    res.json(user.tasks)
}

module.exports = { createTask, updateTask, deleteTask, getTasks};