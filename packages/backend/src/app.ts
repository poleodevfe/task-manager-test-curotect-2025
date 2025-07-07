import express from 'express';
import type { Express, Request, Response } from 'express';
import taskRoutes from './api/task/task.routes';

const app: Express = express();

// mdw to parse JSON bodies
app.use(express.json());

// health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

app.use('/api/task', taskRoutes);

export default app;
