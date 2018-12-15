import * as express from 'express';
import Middleware from './middleware';
import Routes from './router';

/**
 * @export
 * @class Server
 */
export class Server {
	// set app to be of type express.Application
	public app: express.Application;

	constructor() {
		this.app = express();
		Middleware.init(this);
		Routes.init(this);
	}
}

export default new Server().app;
