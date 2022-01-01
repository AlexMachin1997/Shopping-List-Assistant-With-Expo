import React from 'react';

import { truncate } from 'lodash';

import { createStackNavigator } from '@react-navigation/stack';

// styled-components dependencies
import { useTheme } from 'styled-components';

// The TabStack, renders the tab related screens e.g. The shopping lists screen
import { TabStack } from './TabStack';

// The Single shopping list screen
import ShoppingListScreen from '../screens/ShoppingList';

// The settings screen
import SettingsScreen from '../screens/Settings';

// The header icon e.g. Settings icon, back button etc
import { HeaderIcon } from '../components/navigation/Header';

// custom hooks
import { useShoppingList } from '../hooks';

// Generates the stack navigator components
const Stack = createStackNavigator();

export const MainStack = () => {
	// Access the global shopping list related state
	const { dispatch: updateShoppingListState } = useShoppingList();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Stack.Navigator
			initialRouteName='Tabs'
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: darkBlue,
					borderBottomColor: lightBlue,
					borderTopColor: darkBlue,
					borderWidth: 1,
					borderStyle: 'solid'
				},
				headerTintColor: '#CCDBDC',
				headerPressColorAndroid: 'red',
				headerLeft: (props) => (
					<HeaderIcon
						action={() => navigation.toggleDrawer()}
						icon='menu'
						marginLeft={10}
						{...props}
					/>
				),
				headerRight: (props) => (
					<HeaderIcon
						action={() => navigation.navigate('Settings')}
						icon='settings'
						marginRight={10}
						{...props}
					/>
				)
			})}
		>
			<Stack.Screen name='Tabs' component={TabStack} />
			<Stack.Screen
				name='ShoppingList'
				component={ShoppingListScreen}
				options={({ navigation, route }) => ({
					title: truncate(route.params.title),
					headerRight: null,
					headerLeft: (props) => (
						<HeaderIcon
							action={() => {
								// When you go back to the homepage reset the shoppingList state
								updateShoppingListState({
									type: 'SET_SHOPPING_LIST',
									payload: {
										shoppingList: null
									}
								});

								// Go back to the previous screen
								navigation.goBack();
							}}
							icon='arrow-back'
							marginLeft={10}
							{...props}
						/>
					)
				})}
			/>
			<Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Settings' }} />
		</Stack.Navigator>
	);
};
