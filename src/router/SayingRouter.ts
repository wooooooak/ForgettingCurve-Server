import { Router } from 'express';
import SayingController from '../controllers/SayingController';

export default class SayingRouter {
	public router: Router;
	private sayingCtrl: SayingController;
	constructor() {
		this.sayingCtrl = new SayingController();
		this.router = Router();
		this.routes();
	}

	private routes = (): void => {
		this.router.get('/', this.sayingCtrl.getOne);
	};
}
