const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const removeTask = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; // Indicate success
  } catch (error) {
    console.error(`Error removing task with ID ${id}:`, error);
    throw error;
  }
};

export const updateTask = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
}; 