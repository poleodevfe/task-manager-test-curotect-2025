import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
  type Task,
  type UpdateTaskPayload,
} from '../../api/taskApi';

interface IUseAppReturnType {
  tasks: Task[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
  handleToggleComplete: (task: Task) => void;
  handleDelete: (id: string) => void;
}

export const useApp = (): IUseAppReturnType => {
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

  return {
    tasks,
    isLoading,
    isError,
    error,
    title,
    setTitle,
    description,
    setDescription,
    handleSubmit,
    isCreating,
    handleToggleComplete,
    handleDelete,
  };
};
