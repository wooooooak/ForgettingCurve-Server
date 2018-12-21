import * as express from 'express';
import { getManager, createConnection, Raw } from 'typeorm';
import * as moment from 'moment';

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
				newStudy.createdAt = '2018-12-19';
			}
			await studyRepo.save(newStudy);
			res.status(200).json(newStudy);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	public getTodayStudies = async (
		req: express.Request,
		res: express.Response
	) => {
		const { email } = req.decodedUser!;
		const today = moment().format('YYYY-MM-DD');
		try {
			const studyRepo = getManager().getRepository(Study);
			const todayStudies = await studyRepo.find({
				user: email,
				createdAt: Raw((alias) => `DATE(${alias}) = '${today}'`)
			});
			res.status(200).json(todayStudies);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	public getReviewStudies = async (
		req: express.Request,
		res: express.Response
	) => {
		const { email } = req.decodedUser!;
		const day1 = moment().add(-1, 'd').format('YYYY-MM-DD');
		const day7 = moment().add(-7, 'd').format('YYYY-MM-DD');
		const day30 = moment().add(-30, 'd').format('YYYY-MM-DD');
		try {
			const studyRepo = getManager().getRepository(Study);
			const reviewStudies = await studyRepo.find({
				user: email,
				createdAt: Raw(
					(alias) =>
						`DATE(${alias}) = '${day1}' or DATE(${alias}) = '${day7}' or DATE(${alias}) = '${day30}'`
				)
			});
			console.log(reviewStudies);
			res.status(200).json(reviewStudies);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};
}

export default StudyController;
