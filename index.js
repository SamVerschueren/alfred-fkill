'use strict';
const alfy = require('alfy');
const psList = require('ps-list');
const pathExists = require('path-exists');

psList().then(data => {
	const items = alfy
		.inputMatches(data, 'name')
		.map(process => {
			let icon = `./icons/${process.name.replace(/ Helper$/, '')}.png`;

			if (!pathExists.sync(icon)) {
				icon = './icon.png';
			}

			return {
				title: process.name,
				autocomplete: process.name,
				subtitle: process.cmd,
				arg: process.pid,
				icon: {
					path: icon
				},
				mods: {
					alt: {
						subtitle: 'Force kill',
						arg: `${process.pid} force`
					}
				}
			};
		});

	alfy.output(items);
});
