module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-browserify' );

	grunt.initConfig( {
		browserify: {
			client: {
				src: [
					'./src/client.js'
				],
				dest: './dist/client.js',
				options: {
					transform: [ [ 'babelify', { presets: [ "es2015", "react" ] } ] ]
				}
			},
			server: {
				src: [
					'./src/server.js'
				],
				dest: './dist/server.js',
				options: {
					transform: [ [ 'babelify', { presets: [ "es2015", "react" ] } ] ]
				}
			}
		}
	} );

	grunt.registerTask('default', [
		'browserify:client',
		'browserify:server'
	]);
};
