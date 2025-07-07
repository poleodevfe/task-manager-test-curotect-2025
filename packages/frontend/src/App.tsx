import './App.css';
import { TaskItem } from './components/TaskItem';
import { useApp } from './hooks/useApp';

function App() {
  const {
    tasks,
    isLoading,
    isError,
    error,
    handleSubmit,
    setTitle,
    title,
    description,
    setDescription,
    isCreating,
    handleToggleComplete,
    handleDelete,
  } = useApp();

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
              <TaskItem
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
