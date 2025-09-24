const advisories: Bun.Security.Advisory[] = [
	{
		package: 'malware',
		level: 'fatal',
		url: 'https://example.com',
		description: 'The package is called malware...',
	},
];

export const scanner: Bun.Security.Scanner = {
	version: '1',
	async scan({packages}) {
		return advisories.filter(m => {
			return packages.some(p => p.name === m.package);
		});
	},
};
