import * as express from 'express';
import { getManager, createConnection } from 'typeorm';
import { User } from '../models/User';
import { Study } from '../models/Study';

class StudyController {
	public getAll = async (req: express.Request, res: express.Response) => {
		try {
			console.log(req.decodedUser);
			res.status(200).json(req.decodedUser);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	public addStudy = async (req: express.Request, res: express.Response) => {
		const { title, content } = req.body;
		try {
			const { email } = req.decodedUser!;
			const userRepo = getManager().getRepository(User);
			const studyRepo = getManager().getRepository(Study);
			const user = await userRepo.findOne({ email });
			const newStudy = new Study();
			if (user) {
				newStudy.title = title;
				newStudy.content = content;
				newStudy.user = user;
			}
			await studyRepo.save(newStudy);
			res.status(200).json(newStudy);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};
}

export default StudyController;