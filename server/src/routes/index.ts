import { Router } from 'express';
import { searchLogs } from '@/controllers/log.controller';

export const routes: Router = Router();

routes.use('/api/logs', searchLogs);
