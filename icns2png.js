#!/usr/bin/env node
'use strict';
const path = require('path');
const fs = require('fs');
const iconUtil = require('iconutil');

const src = path.join(process.cwd(), process.argv[2]);
const dest = path.join(process.cwd(), process.argv[3]);

const files = fs.readdirSync(src).filter(x => /\.icns$/.test(x));

const convert = (input, options) => {
	const filename = path.basename(input, '.icns');

	return new Promise((resolve, reject) => {
		iconUtil.toIconset(input, (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			let ret;
			let index = 0;

			while (!ret && index < options.size.length) {
				ret = result[options.size[index++]];
			}

			resolve(ret);
		});
	}).then(buffer => {
		fs.writeFileSync(path.join(options.output, `${filename}.png`), buffer);
		console.log(`Converted \`${filename}\``);
	});
};

Promise.all(files.map(file => {
	const options = {
		output: dest,
		size: ['icon_32x32@2x.png', 'icon_128x128.png']
	};

	return convert(path.join(src, file), options);
}));
