import * as express from 'express';
import { IServer } from '../interfaces/ServerInterface';
import UserRouter from './UserRouter';

export default class Routes {
	static init(server: IServer): void {
		const router: express.Router = express.Router();

		server.app.use('/user', new UserRouter().router);
		server.app.use('/', router);
		server.app.use('/', (req, res) => {
			console.log('here');
			res.json({ title: 'Hey', message: 'Hello there!' });
		});
	}
}