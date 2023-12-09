module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'expo-router/babel',

			// React-Navigation animation plugin, allows the drawer and many other stacks to function
			'react-native-reanimated/plugin'
		]
	};
};
