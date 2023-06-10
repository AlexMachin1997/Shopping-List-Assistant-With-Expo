module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			// Plugin for the expo-router
			'@babel/plugin-proposal-export-namespace-from',
			require.resolve('expo-router/babel'),

			// React-Navigation animation plugin, allows the drawer and many other stacks to function
			'react-native-reanimated/plugin',

			// Allows process.env directly from within
			'transform-inline-environment-variables'
		]
	};
};
