import * as express from 'express';
import { getManager, createConnection, Raw } from 'typeorm';
import * as moment from 'moment-timezone';

import { User } from '../models/User';
import { Study } from '../models/Study';

class StudyController {
	public getAll = async (req: express.Request, res: express.Response) => {
		try {
			const { email } = req.decodedUser!;
			const { offset } = req.params;
			const studyRepo = getManager().getRepository(Study);
			const stories = await studyRepo.find({
				where: {
					user: email
				},
				skip: offset,
				take: 20,
				order: {
					createdAt: 'DESC'
				}
			});
			if (stories.length === 0) {
				res.status(200).json({ isDataRemain: false, stories });
			} else {
				res.status(200).json({ isDataRemain: true, stories });
			}
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
		const { timeoffset } = req.query;
		const todayStart = moment().startOf('day').subtract(timeoffset, 'm');
		const todayStartString = todayStart.format('YYYY-MM-DD HH:00:00');
		const todayEnd = todayStart.add(1, 'd').format('YYYY-MM-DD HH:00:00');
		try {
			const studyRepo = getManager().getRepository(Study);
			const todayStudies = await studyRepo.find({
				where: {
					user: email,
					createdAt: Raw(
						(alias) =>
							`DATE(${alias}) BETWEEN '${todayStartString}' AND '${todayEnd}'`
					)
				}
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
		const { timeoffset } = req.query;
		console.log('utc-offset : ', timeoffset);
		//오늘의 시작
		let baseDay = moment().startOf('day').subtract(timeoffset, 'm');
		const day1Start = baseDay.add(-1, 'd').format('YYYY-MM-DD HH:00:00');
		const day1End = baseDay.add(1, 'd').format('YYYY-MM-DD HH:00:00');
		baseDay = moment().startOf('day').subtract(timeoffset, 'm');
		const day7Start = baseDay.add(-8, 'd').format('YYYY-MM-DD HH:00:00');
		const day7End = baseDay.add(1, 'd').format('YYYY-MM-DD HH:00:00');
		baseDay = moment().startOf('day').subtract(timeoffset, 'm');
		const day30Start = baseDay.add(-30, 'd').format('YYYY-MM-DD HH:00:00');
		const day30End = baseDay.add(1, 'd').format('YYYY-MM-DD HH:00:00');
		try {
			const studyRepo = getManager().getRepository(Study);
			const reviewStudies = await studyRepo.find({
				where: {
					user: email,
					createdAt: Raw(
						(alias) =>
							`DATE(${alias}) BETWEEN '${day1Start}' AND '${day1End}' 
								or DATE(${alias}) BETWEEN '${day7Start}' AND '${day7End}' or 
									DATE(${alias}) BETWEEN '${day30Start}' AND '${day30End}'`
					)
				}
			});
			res.status(200).json(reviewStudies);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};
}

export default StudyController;
