import * as express from 'express';
import { getManager } from 'typeorm';
import { User } from '../models/User';
import Jwt from '../lib/Jwt';

class AuthController {
	public socialLogin = async (req: express.Request, res: express.Response) => {
		try {
			const jwtHelper = new Jwt();
			const email: string = req.body.email;
			const userRepo = getManager().getRepository(User);
			const user = await userRepo.findOne({ email });
			const token = await jwtHelper.genToken(req.body);
			console.log(token);
			if (user) {
				//token 새로 생성하기
				res.status(200).json({ user, token });
			} else {
				const newUser = await userRepo.create(req.body);
				//token 생성하기

				await userRepo.save(newUser);
				res.status(200).json({ user: newUser, token });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};
}

export default AuthController;
