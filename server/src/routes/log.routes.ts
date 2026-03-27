import { searchLogs, countRows } from '@/controllers/log.controller';
import { Router } from 'express';

const logsRouter: Router = Router();

logsRouter.get('/', searchLogs);
logsRouter.get('/count', countRows);

export { logsRouter };
