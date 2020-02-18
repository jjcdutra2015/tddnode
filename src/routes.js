import { Router } from 'express';
import UseController from './app/controllers/UseController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/users', UseController.store);

export default routes;
