import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';

require('dotenv').config();

export default class Jwt {
	public genToken = async (payload: User) => {
		try {
			const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
				expiresIn: '7d',
				issuer: 'leeyongjun'
			});
			return token;
		} catch (error) {
			console.log('error', error);
			return error;
		}
	};

	public decodeToken = async (token: string) => {
		try {
			const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
			return decoded;
		} catch (error) {
			console.log(error);
			return error;
		}
	};
}
