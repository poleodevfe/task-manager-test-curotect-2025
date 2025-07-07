import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
  type Task,
  type UpdateTaskPayload,
} from './api/taskApi';
import './App.css';

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // queries to get all tasks
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTask,
  });

  // mutations to create a new task
  const { mutate: addTask, isPending: isCreating } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // when we create a task we invalidate the query to update the task list
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
  });

  // mutation to update a task
  const { mutate: editTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      // when we update a task we invalidate the query to update the task list
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: removeTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // when we delete a task we invalidate the query to update the task list
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Form handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTask({
      title,
      description: description || '',
      status: 'pending',
    });
  };

  const handleToggleComplete = (task: Task) => {
    const updatedTaskPayload: UpdateTaskPayload = {
      id: task.id,
      completed: !task.completed,
    };
    editTask(updatedTaskPayload);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      removeTask(id);
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-sky-400">
          Task Manager
        </h1>

        {/* Form to create tasks */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-4 bg-slate-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl mb-4">Add New Task</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="p-2 rounded bg-slate-700 border border-slate-600 h-24 resize-y focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="mt-4 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full transition-colors"
          >
            {isCreating ? 'Creating...' : 'Create Task'}
          </button>
        </form>

        {/* Task list */}
        <div>
          <h2 className="text-2xl mb-4">Task List</h2>
          {isLoading && <p>Loading tasks...</p>}
          {isError && (
            <p className="text-red-500">
              Error:{' '}
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          )}
          <ul className="space-y-4">
            {tasks?.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-slate-800 rounded-lg flex justify-between items-center shadow-md flex-col"
              >
                <div>
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-slate-400">{task.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 mt-5">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className="px-3 py-1 text-sm font-semibold rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 text-sm font-semibold rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
