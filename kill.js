'use strict';
const fkill = require('fkill');

const args = process.argv[2].split(' ');

fkill(parseInt(args[0], 10), {
	force: args[1] === 'force'
});
