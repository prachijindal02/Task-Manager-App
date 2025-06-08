import React, { useState } from 'react';

const TaskItem = ({ task, onRemove, onUpdate, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const toggleComplete = () => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    onUpdate(task.id, {
      title: task.title,
      description: task.description,
      status: newStatus,
    });
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      alert('Title and description cannot be empty');
      return;
    }
    onUpdate(task.id, {
      title,
      description,
      status: task.status,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  // Styles
  const containerStyle = {
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: task.status === 'done'
      ? (darkMode ? '#27532a' : '#d4edda') // darker green in dark mode
      : (darkMode ? '#1e1e1e' : '#fff'),
    border: darkMode ? '1px solid #444' : '1px solid #ccc',
    color: darkMode ? '#eee' : '#000',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '5px',
    border: darkMode ? '1px solid #555' : '1px solid #ccc',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#eee' : '#000',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  };

  const buttonStyle = (color) => ({
    padding: '6px 12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: color,
    color: 'white',
    fontWeight: 'bold',
  });

  return (
    <div style={containerStyle}>
      {isEditing ? (
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
            placeholder="Description"
          />
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 5px 0' }}>{task.title}</h3>
          <p style={{ margin: 0 }}>{task.description}</p>
        </div>
      )}

      <div
        style={{
          marginLeft: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {isEditing ? (
          <>
            <button onClick={handleSave} style={buttonStyle('green')}>
              Save
            </button>
            <button onClick={handleCancel} style={buttonStyle('grey')}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleComplete}
              style={buttonStyle(task.status === 'done' ? '#e59500' : '#D81159')}
            >
              {task.status === 'done' ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => setIsEditing(true)} style={buttonStyle('#8F2D56')}>
              Edit
            </button>
            <button onClick={() => onRemove(task.id)} style={buttonStyle('#218380')}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
