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
