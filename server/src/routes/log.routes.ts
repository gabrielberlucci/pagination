import { searchLogs } from '@/controllers/log.controller';

import { Router } from 'express';

const logsRouter: Router = Router();

logsRouter.get('/logs', searchLogs);
