import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config: staticConfigFromAppJSONFile }: ConfigContext): ExpoConfig => ({
	// Spread the entire app.json configuration
	...staticConfigFromAppJSONFile,

	// Mandatory configuration, just use the values defined in the app.json file
	slug: staticConfigFromAppJSONFile?.slug ?? '',
	name:
		process.env.APP_ENV === 'production'
			? `${staticConfigFromAppJSONFile.name}`
			: `${staticConfigFromAppJSONFile.name} (Development)`,

	extra: {
		// Spread the existing config defined in the app.json file
		...(staticConfigFromAppJSONFile?.extra ?? {})
	},

	ios: {
		...staticConfigFromAppJSONFile.ios,
		bundleIdentifier:
			process.env.APP_ENV === 'production'
				? `${staticConfigFromAppJSONFile.ios?.bundleIdentifier}`
				: `${staticConfigFromAppJSONFile.ios?.bundleIdentifier}.dev`
	},

	android: {
		package:
			process.env.APP_ENV === 'production'
				? `${staticConfigFromAppJSONFile.ios?.bundleIdentifier}`
				: `${staticConfigFromAppJSONFile.ios?.bundleIdentifier}.dev`
	}
});
