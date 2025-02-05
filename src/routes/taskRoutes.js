const express = require('express');
const taskRouter = express.Router();


let todos = [];
let id = 1;

taskRouter.get('/', (req, res) => res.json(todos));

//create a new todo
taskRouter.post("/", (req, res) => {
    const { title, completed = false } = req.body;
    const newTodo = { id: id++, title, completed};
    todos.push(newTodo);
    res.status(201).json(newTodo);
    console.log(todos);
})

//update a todo
taskRouter.put('/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === Number(req.params.id));
    const {title, completed} = req.body;
    todo.title = title;
    todo.completed = completed;
    res.json(todo);
})

//delete a todo
taskRouter.delete('/:id', (req, res) => {
    const todo = todos.findIndex(todo => todo.id === Number(req.params.id));
    const deletedTodo = todos.splice(todo, 1);
    res.json(deletedTodo);


})

module.exports = taskRouter;