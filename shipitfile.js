module.exports = function (shipit) {

	require('shipit-deploy')(shipit);

	var utils = require('shipit-utils');

	shipit.initConfig({
		default: {
			workspace: '/tmp/demo',
			deployTo: '/tmp/demo',
			repositoryUrl: 'https://github.com/nmccartney/sailsUser',
			ignores: ['.git', 'node_modules'],
			rsync: ['--del'],
			keepReleases: 2,
			key: '$HOME/.ec2/gsg-keypair',
			shallowClone: true
		},
		staging: {
		  	servers: 'root@107.170.137.178'
		}
	});

	// shipit.task('pwd', function () {
	// 	return shipit.remote('pwd');
	// });

	shipit.task('install', function () {
		return shipit.remote('cd ../tmp/demo/current; npm install	');;
	});

	// shipit.task('start', function () {
	// 	return shipit.remote('cd ../tmp/demo/current; forever start index.js; forever -o out.log -e err.log index.js;');;
	// });

	// shipit.task('list', function () {
	// 	return shipit.remote('cd ../tmp/demo/current; forever list');;
	// });

	// shipit.task('stop', function () {
	// 	return shipit.remote('cd ../tmp/demo/current; forever stopall');;
	// });

	// shipit.task('restart',function(){
	// 	shipit.log(require('chalk').green('Restarting server...') )
	// 	var command = 'cd ../tmp/demo/current;'
	// 	+"forever stopall;"
	// 	+" forever start index.js;"
	// 	return shipit.remote(command)
	// 		.then(function(){
	// 			shipit.log(require('chalk').green('Sever has restarted...') )
	// 			shipit.emit('restarted');
	// 		});
	// })

	// shipit.on('deploy:update',function(){
	// 	utils.runTask('install');
	// })

	// shipit.on('deployed',function(){
	// 	utils.runTask('restart');
	// })


	//bootstrap tasks

	//install forever
	shipit.task('forever', function () {
		return shipit.remote('cd ../tmp/demo/current && npm install -g forever');
	});

};