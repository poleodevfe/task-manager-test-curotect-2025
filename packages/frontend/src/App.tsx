// import { useState } from 'react';
import './App.css';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import type { Task } from './api/taskApi';
import { getTask } from './api/taskApi';

function App() {
  // const queryClient = useQueryClient();
  const {
    data: tasks,
    // isLoading,
    // isError,
    // error,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTask,
  });
  return (
    <section className="task__list-container">
      <h2>Tasks lists</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
