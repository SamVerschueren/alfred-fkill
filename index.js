'use strict';
const alfy = require('alfy');
const psList = require('ps-list');

psList().then(data => {
	const items = alfy
		.inputMatches(data, 'name')
		.filter(process => !process.name.endsWith(' Helper'))
		.map(process => {
			const cleanedPath = process.cmd.replace(/\.app\/Contents\/.*$/, '.app');

			// TODO: Use the `process.path` property in `ps-list` when implemented there
			// The below can be removed then
			const pathForIcon = cleanedPath.replace(/ -.*/, ''); // Removes arguments

			return {
				title: process.name,
				autocomplete: process.name,
				// TODO; Use `process.path` property
				subtitle: cleanedPath,
				arg: process.pid,
				icon: {
					type: 'fileicon',
					path: pathForIcon
				},
				mods: {
					alt: {
						subtitle: 'Force kill',
						arg: JSON.stringify({
							alfredworkflow: {
								arg: process.pid,
								variables: {
									force: true
								}
							}
						})
					}
				}
			};
		});

	alfy.output(items);
});
