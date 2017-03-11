'use strict';
const process = [
	'node',
	'python'
];

const processCompare = (a, b) => {
	const aTitle = a.title.toLowerCase();
	const bTitle = b.title.toLowerCase();

	if (process.indexOf(aTitle) !== -1) {
		return -1;
	}

	if (process.indexOf(bTitle) !== -1) {
		return 1;
	}

	return 0;
};

exports.sorter = (a, b) => {
	const isAApp = a.subtitle.endsWith('.app');
	const isBApp = b.subtitle.endsWith('.app');

	if (isAApp && isBApp) {
		return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
	}

	if (isAApp) {
		return -1;
	}

	if (isBApp) {
		return 1;
	}

	return processCompare(a, b);
};
