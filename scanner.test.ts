import {expect, test} from 'bun:test';
import {scanner} from './src/index.ts';

test('There should be no advisories if no packages are being installed', async () => {
	const advisories = await scanner.scan({packages: []});
	expect(advisories.length).toBe(0);
});

test('Safe packages should return no advisories', async () => {
	const advisories = await scanner.scan({
		packages: [
			{
				name: 'lodash',
				version: '4.17.21',
				requestedRange: '^4.17.0',
				tarball: 'https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz',
			},
		],
	});
	expect(advisories.length).toBe(0);
});

test('Should handle scoped packages correctly', async () => {
	const advisories = await scanner.scan({
		packages: [
			{
				name: '@types/node',
				version: '20.0.0',
				requestedRange: '^20.0.0',
				tarball: 'https://registry.npmjs.org/@types/node/-/node-20.0.0.tgz',
			},
		],
	});

	expect(advisories.length).toBe(0);
});
