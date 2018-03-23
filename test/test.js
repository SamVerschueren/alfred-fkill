import childProcess from 'child_process';
import test from 'ava';
import alfyTest from 'alfy-test';
import getPort from 'get-port';

test('search by name', async t => {
	const alfy = alfyTest();
	const result = await alfy('bash');

	t.true(result.length > 0);
});

test('search by port', async t => {
	const port = await getPort();
	childProcess.spawn('node', ['test/_fixture.js', port]);

	const alfy = alfyTest();
	const result = await alfy(`:${port}`);

	t.is(result.length, 1);
	t.true(result[0].subtitle.startsWith(`${port} - `));
});
