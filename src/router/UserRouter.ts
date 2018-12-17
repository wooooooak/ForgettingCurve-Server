import { Router } from 'express';
import UserController from '../controllers/UserControl';

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
		this.router.post('/', new UserController().socialLogin);
	}
}
