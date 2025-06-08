import React, { useState } from 'react';

const TaskForm = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !status) {
      setError('All fields are required.');
      return;
    }
    onAddTask({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('todo');
    setError('');
  };

  // Merge base styles with dark mode overrides
  const combinedStyles = {
    form: {
      ...styles.form,
      backgroundColor: darkMode ? '#222' : '#fff',
      boxShadow: darkMode ? '0 4px 8px rgba(255, 255, 255, 0.1)' : '0 4px 8px rgba(0,0,0,0.1)',
    },
    formTitle: {
      ...styles.formTitle,
      color: darkMode ? '#eee' : '#333',
    },
    label: {
      ...styles.label,
      color: darkMode ? '#ccc' : '#555',
    },
    input: {
      ...styles.input,
      backgroundColor: darkMode ? '#333' : '#fff',
      border: darkMode ? '1px solid #555' : '1px solid #ddd',
      color: darkMode ? '#eee' : '#000',
    },
    textarea: {
      ...styles.textarea,
      backgroundColor: darkMode ? '#333' : '#fff',
      border: darkMode ? '1px solid #555' : '1px solid #ddd',
      color: darkMode ? '#eee' : '#000',
    },
    select: {
      ...styles.select,
      backgroundColor: darkMode ? '#333' : '#fff',
      border: darkMode ? '1px solid #555' : '1px solid #ddd',
      color: darkMode ? '#eee' : '#000',
    },
    submitButton: {
      ...styles.submitButton,
      backgroundColor: darkMode ? '#2ecc71' : '#28a745',
    },
    errorText: {
      ...styles.errorText,
      color: darkMode ? '#ff6b6b' : 'red',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={combinedStyles.form}>
      <h2 style={combinedStyles.formTitle}>Add New Task</h2>
      {error && <p style={combinedStyles.errorText}>{error}</p>}
      <div style={styles.formGroup}>
        <label htmlFor="title" style={combinedStyles.label}>Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={combinedStyles.input}
          placeholder="e.g., Buy groceries"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="description" style={combinedStyles.label}>Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={combinedStyles.textarea}
          placeholder="e.g., Milk, bread, eggs"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="status" style={combinedStyles.label}>Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={combinedStyles.select}
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button type="submit" style={combinedStyles.submitButton}>Add Task</button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  formTitle: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#000',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    minHeight: '80px',
    backgroundColor: '#fff',
    color: '#000',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1em',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default TaskForm;
