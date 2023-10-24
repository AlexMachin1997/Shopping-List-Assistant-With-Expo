import { ExpoConfig, ConfigContext } from 'expo/config';

import dotenv from 'dotenv';

dotenv.config();

export default ({ config: staticConfigFromAppJSONFile }: ConfigContext): ExpoConfig => ({
	// Spread the entire app.json configuration
	...staticConfigFromAppJSONFile,

	// Mandatory configuration, just use the values defined in the app.json file
	slug: staticConfigFromAppJSONFile?.slug ?? '',
	name: staticConfigFromAppJSONFile?.name ?? '',

	extra: {
		// Spread the existing config defined in the app.json file
		...(staticConfigFromAppJSONFile?.extra ?? {})
	}
});
