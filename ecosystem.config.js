module.exports = {
	apps: [
		{
			name: 'server',
			script: 'build/server.js',
			instances: 0,
			exec_mode: 'cluster',
			wait_ready: true,
			listen_timeout: 5000,
			kill_timeout: 5000
		}
	]
};
