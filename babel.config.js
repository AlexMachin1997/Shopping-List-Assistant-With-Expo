module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			// React-Navigation animation plugin, allows the drawer and many other stacks to function
			'react-native-reanimated/plugin'
		]
	};
};
