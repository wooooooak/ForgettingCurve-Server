import * as express from 'express';
import { IFamousSaying } from '../interfaces/IFamousSaying';
const data: IFamousSaying = require('../../FamousSaying');

class SayingController {
	public getOne = async (req: express.Request, res: express.Response) => {
		try {
			const saying =
				data.saying[Math.floor(Math.random() * data.saying.length)];
			res.status(200).json(saying);
		} catch (error) {
			res.status(500).json(error);
		}
	};
}

export default SayingController;
