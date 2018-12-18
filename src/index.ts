import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as http from 'http';
import Server from './server';

const port: string | number = process.env.PORT || 3000;

Server.set('port', port);

console.log(`Server listening on port ${port}`);

createConnection()
	.then(async (connection) => {
		const server: http.Server = http.createServer(Server);
		server.listen(port);

		server.on('error', (error) => console.log(error));

		server.on('listening', () => console.log('start'));
		process.on('SIGINT', () => {
			server.close(() => {
				console.log('server closed');
				process.exit(0);
			});
		});
	})
	.catch((error) => console.log('TypeORM connection error: ', error));
