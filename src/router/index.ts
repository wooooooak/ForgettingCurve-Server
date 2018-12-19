import * as express from 'express';
import { IServer } from '../interfaces/ServerInterface';
import UserRouter from './UserRouter';
import AuthRouter from './AuthRouter';
import StudyRouter from './StudyRouter';

export default class Routes {
	static init(server: IServer): void {
		const router: express.Router = express.Router();

		server.app.use('/auth', new AuthRouter().router);
		server.app.use('/user', new UserRouter().router);
		server.app.use('/study', new StudyRouter().router);
		server.app.use('/', router);
		server.app.use('/', (req, res) => {
			console.log('here');
			res.json({ title: 'Hey', message: 'Hello there!' });
		});
	}
}
