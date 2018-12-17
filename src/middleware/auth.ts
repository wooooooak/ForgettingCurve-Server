import Jwt from '../lib/Jwt';
import * as express from 'express';
import { User } from '../models/User';

export default class AuthMiddleWare {
	static authByToken = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const token: string = req.headers['auth-header'] || req.query.token;
		if (!token) {
			console.log('헤더에 토큰이 없습니다.');
			res.status(403).json({
				message: 'not logged in'
			});
		}
		try {
			const decodedUser: User = await new Jwt().decodeToken(token);
			req.decodedUser = decodedUser;
			next();
		} catch (error) {
			res.status(403).json({
				message: '토큰이 유효하지 않습니다.'
			});
		}
	};
}
