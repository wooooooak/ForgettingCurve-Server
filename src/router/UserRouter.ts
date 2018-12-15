import { Router } from 'express';

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
		this.router.post('/', () => console.log('p9ost!!'));
	}
}
