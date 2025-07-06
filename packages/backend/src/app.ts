import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();

// mdw to parse JSON bodies
app.use(express.json());

// health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

export default app;
