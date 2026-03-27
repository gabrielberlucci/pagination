import { Router } from 'express';
import { logsRouter } from './log.routes';

const routes: Router = Router();

routes.use('/api/logs', logsRouter);

export { routes };
