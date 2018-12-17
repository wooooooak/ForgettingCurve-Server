import * as express from 'express';
import { getManager } from 'typeorm';

class UserController {
	public async test(req: express.Request, res: express.Response) {
		try {
			res.status(200).json(req.decodedUser);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default UserController;
