import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import { getTasks, addTask, removeTask, updateTask } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Please check your network connection and ensure the backend is running.');
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (err) {
      setError(`Failed to add task: ${err.message}. Please try again.`);
      console.error("Error adding task:", err);
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      await removeTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(`Failed to remove task: ${err.message}. Please try again.`);
      console.error("Error removing task:", err);
    }
  };

  const handleUpdateTask = async (id, updatedFields) => {
    try {
      const updatedTask = await updateTask(id, updatedFields);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(`Failed to update task: ${err.message}. Please try again.`);
      console.error("Error updating task:", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) return <div style={darkMode ? darkStyles.container : lightStyles.container}>Loading tasks...</div>;
  if (error) return (
    <div style={darkMode ? darkStyles.container : lightStyles.container}>
      <p style={darkMode ? darkStyles.errorText : lightStyles.errorText}>{error}</p>
      <button onClick={fetchTasks} style={darkMode ? darkStyles.retryButton : lightStyles.retryButton}>Retry</button>
    </div>
  );

  return (
    <div style={darkMode ? darkStyles.container : lightStyles.container}>
      <h1 style={darkMode ? darkStyles.heading : lightStyles.heading}>Task Manager</h1>

      {/* Dark Mode Toggle Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          style={darkMode ? darkStyles.toggleButton : lightStyles.toggleButton}
          aria-label="Toggle dark mode"
        >
          {darkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
        </button>
      </div>

      {/* Pass darkMode to TaskForm */}
      <TaskForm onAddTask={handleAddTask} darkMode={darkMode} />

      {/* Filter buttons */}
      <div style={darkMode ? darkStyles.filterContainer : lightStyles.filterContainer}>
        <button
          style={filter === 'all' ? (darkMode ? darkStyles.activeFilterButton : lightStyles.activeFilterButton) : (darkMode ? darkStyles.filterButton : lightStyles.filterButton)}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          style={filter === 'todo' ? (darkMode ? darkStyles.activeFilterButton : lightStyles.activeFilterButton) : (darkMode ? darkStyles.filterButton : lightStyles.filterButton)}
          onClick={() => setFilter('todo')}
        >
          Pending
        </button>
        <button
          style={filter === 'done' ? (darkMode ? darkStyles.activeFilterButton : lightStyles.activeFilterButton) : (darkMode ? darkStyles.filterButton : lightStyles.filterButton)}
          onClick={() => setFilter('done')}
        >
          Completed
        </button>
      </div>

      <h2 style={darkMode ? darkStyles.subHeading : lightStyles.subHeading}>My Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p style={darkMode ? darkStyles.noTasks : lightStyles.noTasks}>No tasks available. Add a new one!</p>
      ) : (
        <div style={darkMode ? darkStyles.taskList : lightStyles.taskList}>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={handleRemoveTask}
              onUpdate={handleUpdateTask}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const commonStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2.5em',
  },
  subHeading: {
    marginTop: '30px',
    marginBottom: '20px',
    borderBottom: '2px solid',
    paddingBottom: '10px',
  },
  taskList: {
    display: 'grid',
    gap: '15px',
  },
  noTasks: {
    textAlign: 'center',
    fontSize: '1.2em',
    padding: '20px',
    borderRadius: '8px',
    border: '1px dashed',
  },
  errorText: {
    textAlign: 'center',
    fontSize: '1.2em',
    marginBottom: '15px',
  },
  retryButton: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    border: 'none',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  activeFilterButton: {
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    border: 'none',
  },
};

// Light mode styles
const lightStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#eef2f6',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
  heading: {
    ...commonStyles.heading,
    color: '#2c3e50',
  },
  subHeading: {
    ...commonStyles.subHeading,
    color: '#34495e',
    borderBottomColor: '#ccc',
  },
  taskList: {
    ...commonStyles.taskList,
  },
  noTasks: {
    ...commonStyles.noTasks,
    color: '#7f8c8d',
    borderColor: '#ccc',
  },
  errorText: {
    ...commonStyles.errorText,
    color: 'red',
  },
  retryButton: {
    ...commonStyles.retryButton,
    backgroundColor: '#007bff',
    color: 'white',
  },
  filterContainer: {
    ...commonStyles.filterContainer,
  },
  filterButton: {
    ...commonStyles.filterButton,
    backgroundColor: '#ddd',
    color: '#555',
    border: 'none',
  },
  activeFilterButton: {
    ...commonStyles.activeFilterButton,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
  },
  toggleButton: {
    ...commonStyles.toggleButton,
    backgroundColor: '#007bff',
    color: 'white',
  },
};

// Dark mode styles
const darkStyles = {
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#121212',
    boxShadow: '0 8px 16px rgba(255,255,255,0.1)',
  },
  heading: {
    ...commonStyles.heading,
    color: '#eee',
  },
  subHeading: {
    ...commonStyles.subHeading,
    color: '#ccc',
    borderBottomColor: '#555',
  },
  taskList: {
    ...commonStyles.taskList,
  },
  noTasks: {
    ...commonStyles.noTasks,
    color: '#bbb',
    borderColor: '#555',
  },
  errorText: {
    ...commonStyles.errorText,
    color: '#ff6b6b',
  },
  retryButton: {
    ...commonStyles.retryButton,
    backgroundColor: '#bb86fc',
    color: '#121212',
  },
  filterContainer: {
    ...commonStyles.filterContainer,
  },
  filterButton: {
    ...commonStyles.filterButton,
    backgroundColor: '#333',
    color: '#bbb',
    border: 'none',
  },
  activeFilterButton: {
    ...commonStyles.activeFilterButton,
    backgroundColor: '#bb86fc',
    color: '#121212',
    border: 'none',
  },
  toggleButton: {
    ...commonStyles.toggleButton,
    backgroundColor: '#bb86fc',
    color: '#121212',
  },
};

export default App;
