import { createLogs } from '@/controllers/log.controller';

import { Router } from 'express';

const logsRouter: Router = Router();

logsRouter.post('/create', createLogs);
