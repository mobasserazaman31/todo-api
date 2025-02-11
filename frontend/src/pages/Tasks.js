import React, { useEffect, useState } from 'react'
import { getTasks, deleteTask, updateTask, createTask } from '../apis/tasksApi';
import "../styles/Tasks.css";
import axios from 'axios';

export default function Tasks({ user, logout }) {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [updateFormIsOpen, setUpdateFormIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasksFetched, setTasksFetched] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
        setTasksFetched(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask({ title, completed });
      setTasks(response.data);
      setTitle('');
      setCompleted(false);

    } catch (error) {
      console.log(error);
    }
  }

  const openUpdateForm = (task) => {
    setUpdateFormIsOpen(true);
    setTitle(task.title);
    setCompleted(task.completed);
    setCurrentTask(task);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateTask(currentTask._id, { title, completed });
      setTasks(response.data);
      setTitle('');
      setCompleted(false);
      setCurrentTask(null);
      setUpdateFormIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      console.log(response);
      if(response.status === 200) logout();
    }catch(error){
      console.log(error);
    }
  }

  if (tasksFetched === false) return;

  const updateForm = <form onSubmit={handleUpdate}>
    <label>Title</label>
    <input type='text' id='title' name='title' onChange={e => setTitle(e.target.value)} placeholder="Title" value={title} required></input>
    <label>Complete</label>
    <input type='checkbox' id='completed' name='completed' checked={completed} onChange={(e) => setCompleted(e.target.checked)}></input>
    <button type='submit'>Update</button>
    <button onClick={() => { setUpdateFormIsOpen(false); setCurrentTask(null) }}>Cancel</button>
  </form>;

  return (
    <div>
      <h1 id="heading">Welcome {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
      {updateFormIsOpen ? updateForm : <ul>
        {tasks.map((task) =>
          <li key={task._id}>
            <p>{task.title}</p>
            <p>Completed? {task.completed ? "Yes" : "No"}</p>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <button onClick={() => openUpdateForm(task)}>Update</button>
          </li>)}
        <form onSubmit={handleCreate}>
          <label>Title</label>
          <input type='text' id='title' name='title' onChange={e => setTitle(e.target.value)} placeholder="Title" value={title} required></input>
          <label>Complete</label>
          <input type='checkbox' id='completed' name='completed' checked={completed} onChange={(e) => setCompleted(e.target.checked)}></input>
          <button type='submit'>Create Task</button>
        </form>
      </ul>}
    </div>
  )
}
