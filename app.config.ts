import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config: staticConfigFromAppJSONFile }: ConfigContext): ExpoConfig => ({
	// Spread the entire app.json configuration
	...staticConfigFromAppJSONFile,

	plugins: ['expo-router', 'expo-build-properties'],

	// Mandatory configuration, just use the values defined in the app.json file
	slug: staticConfigFromAppJSONFile?.slug ?? '',
	name: staticConfigFromAppJSONFile?.name ?? '',

	extra: {
		// Spread the existing config defined in the app.json file
		...(staticConfigFromAppJSONFile?.extra ?? {})
	}
});
