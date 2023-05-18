import { useTheme } from 'styled-components';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MaterialBottomTabs } from '../../src/layouts';

const TabsLayout = () => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<MaterialBottomTabs
			barStyle={{
				backgroundColor: darkBlue,
				borderTopColor: lightBlue,
				borderWidth: 2,
				borderStyle: 'solid'
			}}
			initialRouteName='ShoppingLists'
			safeAreaInsets={{ bottom: 0 }}
		>
			<MaterialBottomTabs.Screen
				name='ShoppingLists'
				options={{
					title: 'Shopping lists',
					tabBarIcon: () => (
						<MaterialCommunityIcons name='clipboard-text-outline' size={25} color={lightBlue} />
					)
				}}
			/>

			<MaterialBottomTabs.Screen
				name='StoreTracker'
				options={{
					title: 'Tracking items',
					tabBarLabel: 'Find stores',
					tabBarIcon: () => (
						<MaterialCommunityIcons name='crosshairs-gps' size={25} color={lightBlue} />
					)
				}}
			/>
		</MaterialBottomTabs>
	);
};

export default TabsLayout;
