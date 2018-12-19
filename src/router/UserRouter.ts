import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleWare from '../middleware/auth';

export default class UserRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	/**
     * @memberof UserRouter
     */
	public routes(): void {
		this.router.get('/', () => console.log('get!!'));
		this.router.get(
			'/test',
			AuthMiddleWare.authByToken,
			new UserController().test
		);
	}
}
