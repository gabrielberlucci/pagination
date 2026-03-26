import { Router } from 'express';
import { createLogs } from '@/controllers/log.controller';

export const routes: Router = Router();

routes.use('/api/logs', createLogs);
