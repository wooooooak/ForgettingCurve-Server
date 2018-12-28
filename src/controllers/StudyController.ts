import * as express from 'express';
import {
	getManager,
	createConnection,
	Raw,
	RelationQueryBuilder
} from 'typeorm';
import * as moment from 'moment-timezone';

import { User } from '../models/User';
import { Study } from '../models/Study';

class StudyController {
	public complete = async (req: express.Request, res: express.Response) => {
		try {
			const { id } = req.params;
			const { email } = req.decodedUser!;
			const studyRepo = getManager().getRepository(Study);
			const data = await studyRepo.findOne({
				where: {
					user: email,
					id
				}
			});
			if (data) {
				if (data.cycle === 1) {
					data.reviewDay = moment(data.reviewDay)
						.add(7, 'd')
						.toDate();
				} else if (data.cycle === 2) {
					data.reviewDay = moment(data.reviewDay)
						.add(30, 'd')
						.toDate();
				}
				data.cycle += 1;
				await studyRepo.save(data);
				res.status(200).json(data);
			} else {
				res.status(200).json({ message: '접근이 잘못 되었습니다.' });
			}
		} catch (error) {
			console.log(error);
		}
	};

	public postpone = async (req: express.Request, res: express.Response) => {
		try {
			const { id } = req.params;
			const { email } = req.decodedUser!;
			const studyRepo = getManager().getRepository(Study);
			const data = await studyRepo.findOne({
				where: {
					user: email,
					id
				}
			});
			if (data) {
				console.log(moment(data.reviewDay).add(1, 'd'));
				data.reviewDay = moment(data.reviewDay).add(1, 'd').toDate();
				await studyRepo.save(data);
				res.status(200).json(data);
			} else {
				res.status(200).json(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	public deleteStudy = async (
		req: express.Request,
		res: express.Response
	) => {
		const { id } = req.params;
		try {
			const { email } = req.decodedUser!;
			const {
				raw
			} = await getManager()
				.createQueryBuilder()
				.delete()
				.from(Study)
				.where('id = :id and userEmail = :email ', { id, email })
				.execute();
			console.log(raw.affectedRows);
			if (!raw.affectedRows) {
				res.status(200).json({
					message: '올바르지 못한 접근이거나, 해당 id의 study가 없습니다.',
					affectedRows: raw.affectedRows
				});
			} else {
				res.status(200).json({
					message: '정상적으로 삭제 되었습니다.',
					affectedRows: raw.affectedRows
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

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
				newStudy.reviewDay = moment().add(1, 'd').utc().toDate();
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
		const todayEnd = todayStart
			.add(1, 'd')
			.subtract(1, 'ms')
			.format('YYYY-MM-DD HH:mm:ss');
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
		const day1Start = baseDay.format('YYYY-MM-DD HH:00:00');
		const day1End = baseDay
			.add(1, 'd')
			.subtract(1, 'ms')
			.format('YYYY-MM-DD HH:mm:ss');
		try {
			const studyRepo = getManager().getRepository(Study);
			const reviewStudies = await studyRepo.find({
				where: {
					user: email,
					reviewDay: Raw(
						(alias) =>
							`DATE(${alias}) BETWEEN '${day1Start}' AND '${day1End}'`
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
