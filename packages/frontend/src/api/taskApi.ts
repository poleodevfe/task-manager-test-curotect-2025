export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
}

const API_URL = '/api/tasks';
