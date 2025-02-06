const todos = [];
let id = 1;

const createTask = (req, res) => {
    const { title, completed = false } = req.body;
    const newTodo = { id: id++, title, completed};
    todos.push(newTodo);
    res.status(201).json(newTodo);
    console.log(todos);
}

const updateTask = (req, res) => {
    const todo = todos.find(todo => todo.id === Number(req.params.id));
    const {title, completed} = req.body;
    todo.title = title;
    todo.completed = completed;
    res.json(todo);
}

const deleteTask = (req, res) => {
    const todo = todos.findIndex(todo => todo.id === Number(req.params.id));
    const deletedTodo = todos.splice(todo, 1);
    res.json(deletedTodo);
}

const getTasks = (req, res) => res.json(todos);

module.exports = { createTask, updateTask, deleteTask, getTasks};