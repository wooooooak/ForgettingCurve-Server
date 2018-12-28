import { Router } from 'express';
import StudyController from '../controllers/StudyController';
import AuthMiddleWare from '../middleware/auth';

export default class StudyRouter {
	public router: Router;
	public studyController: StudyController;
	constructor() {
		this.studyController = new StudyController();
		this.router = Router();
		this.routes();
	}

	private routes = (): void => {
		this.router.get(
			'/all/:offset',
			AuthMiddleWare.authByToken,
			this.studyController.getAll
		);
		this.router.post(
			'/',
			AuthMiddleWare.authByToken,
			this.studyController.addStudy
		);
		this.router.get(
			'/todayStudies',
			AuthMiddleWare.authByToken,
			this.studyController.getTodayStudies
		);
		this.router.get(
			'/reviewStudies',
			AuthMiddleWare.authByToken,
			this.studyController.getReviewStudies
		);
		this.router.delete(
			'/:id',
			AuthMiddleWare.authByToken,
			this.studyController.deleteStudy
		);
		this.router.put(
			'/postpone/:id',
			AuthMiddleWare.authByToken,
			this.studyController.postpone
		);
		this.router.put(
			'/completion/:id',
			AuthMiddleWare.authByToken,
			this.studyController.complete
		);
	};
}
