export type UpdateTaskPayload = {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
}

const API_URL = '/api/tasks';

//get all tasks
export const getTask = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return await response.json();
};

// create a new task
export const createTask = async (
  newTask: Omit<Task, 'id' | 'completed'>
): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POst',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return await response.json();
};

// update task
export const updateTask = async (
  updateTask: UpdateTaskPayload
): Promise<Task> => {
  const response = await fetch(`${API_URL}/${updateTask.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateTask),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return await response.json();
};

// delete task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
