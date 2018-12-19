import { Router } from 'express';
import StudyController from '../controllers/StudyController';
import AuthMiddleWare from '../middleware/auth';

export default class StudyRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.get(
			'/all',
			AuthMiddleWare.authByToken,
			new StudyController().getAll
		);
		this.router.post(
			'/',
			AuthMiddleWare.authByToken,
			new StudyController().addStudy
		);
		this.router.get(
			'/todayStudies',
			AuthMiddleWare.authByToken,
			new StudyController().getTodayStudy
		);
	}
}
