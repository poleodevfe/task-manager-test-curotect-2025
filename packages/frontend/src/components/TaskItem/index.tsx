import type { Task } from '../../api/taskApi';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) => {
  return (
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
          onClick={() => onToggleComplete(task)}
          className="px-3 py-1 text-sm font-semibold rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-sm font-semibold rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
