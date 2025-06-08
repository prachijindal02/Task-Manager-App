// File: app.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// In-memory task list
let tasks = [
  { id: 1, title: 'Finish report', description: 'Complete Q3 summary', status: 'todo' },
  { id: 2, title: 'Team meeting', description: 'Discuss project goals', status: 'todo' },
  { id: 3, title: 'Internship Task', description: 'Complete internship module', status: 'todo' },
  { id: 4, title: 'Gym', description: 'Workout at 6 PM', status: 'done' },
  { id: 5, title: 'DSA Practice', description: 'Solve 6 DSA questions', status: 'done' },
  { id: 6, title: 'Miscellaneous', description: 'Random task to check off', status: 'todo' }
];

let nextId = 7;

// Helper function
const validateTask = ({ title, description, status }) =>
  title && description && status;

// Get all tasks or filter by status
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  const result = status ? tasks.filter(t => t.status === status) : tasks;
  console.log(`GET/tasks${status ? '?status=' + status : ''} - Returning ${result.length} tasks`);
  res.json(result);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!validateTask(req.body)) {
    return res.status(400).json({ error: 'Title, description, and status are required' });
  }

  const newTask = { id: nextId++, title, description, status };
  tasks.push(newTask);
  console.log('POST /tasks - Task added:', newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (!validateTask(req.body)) {
    return res.status(400).json({ error: 'Title, description, and status are required' });
  }

  task.title = title;
  task.description = description;
  task.status = status;
  console.log(`PUT /tasks/${id} - Task updated:`, task);
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  console.log(`DELETE /tasks/${id} - Task deleted`);
  res.status(204).send(); // No content
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
