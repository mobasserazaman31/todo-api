const express = require('express');
const app = express();
app.use(express.json());

//get all todos
app.get('/todos', (req, res) => res.json(todos));

app.listen(5000, () => console.log('Server running on port 5000'));

let todos = [];
let id = 1;

//create a new todo
app.post("/todos", (req, res) => {
    const { title, completed = false } = req.body;
    const newTodo = { id: id++, title, completed};
    todos.push(newTodo);
    res.status(201).json(newTodo);
    console.log(todos);
})

//update a todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === Number(req.params.id));
    const {title, completed} = req.body;
    todo.title = title;
    todo.completed = completed;
    res.json(todo);
})

//delete a todo
app.delete('/todos/:id', (req, res) => {
    const todo = todos.findIndex(todo => todo.id === Number(req.params.id));
    const deletedTodo = todos.splice(todo, 1);
    res.json(deletedTodo);


})