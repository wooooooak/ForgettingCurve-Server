import { Router } from 'express';
import AuthController from '../controllers/AuthControl';

export default class AuthRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}
	public routes(): void {
		this.router.post('/', new AuthController().socialLogin);
	}
}
