import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// styled-components dependencies
import { useTheme } from 'styled-components';

import ShoppingListsScreen from '../screens/ShoppingLists';
import StoreTrackerScreen from '../screens/StoreTracker';

const Tab = createMaterialBottomTabNavigator();

const getHeaderTitle = (route) => {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'ShoppingLists';

	switch (routeName) {
		// The first tab, used to create and view shopping lists
		case 'ShoppingLists': {
			return 'Shopping Lists';
		}

		// The second tab, used to track item's
		case 'TrackItem': {
			return 'Tracking items';
		}

		// By default assume the routeName is ShoppingLists
		default: {
			return 'Shopping Lists';
		}
	}
};

export const TabStack = ({ navigation, route }) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	// Handles the title within the Header e.g. ShoppingLists -> Shopping Lists
	useLayoutEffect(() => {
		navigation.setOptions({ headerTitle: getHeaderTitle(route) });
	}, [navigation, route]);

	return (
		<Tab.Navigator
			initialRouteName='ShoppingLists'
			barStyle={{
				backgroundColor: darkBlue,
				borderTopColor: lightBlue,
				borderWidth: 2,
				borderStyle: 'solid'
			}}
		>
			<Tab.Screen
				name='ShoppingLists'
				component={ShoppingListsScreen}
				options={{
					tabBarLabel: 'Shopping Lists',
					tabBarIcon: () => (
						<MaterialCommunityIcons name='clipboard-text-outline' size={25} color={lightBlue} />
					),
					tabBarAccessibilityLabel: 'Shopping Lists'
				}}
			/>
			<Tab.Screen
				name='TrackItem'
				component={StoreTrackerScreen}
				options={{
					tabBarLabel: 'Find items',
					tabBarIcon: () => (
						<MaterialCommunityIcons name='crosshairs-gps' size={25} color={lightBlue} />
					),
					tabBarAccessibilityLabel: 'Find stores'
				}}
			/>
		</Tab.Navigator>
	);
};

TabStack.propTypes = {
	navigation: PropTypes.shape({
		setOptions: PropTypes.func.isRequired
	}).isRequired,
	route: PropTypes.object.isRequired
};
