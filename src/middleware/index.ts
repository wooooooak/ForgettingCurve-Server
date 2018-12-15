import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { IServer } from '../interfaces/ServerInterface';
import * as cors from 'cors';

export default class Middleware {
	static init(server: IServer): void {
		server.app.use(bodyParser.urlencoded({ extended: false }));
		server.app.use(bodyParser.json());
		server.app.use(compression());
		server.app.use(cors());
	}
}
