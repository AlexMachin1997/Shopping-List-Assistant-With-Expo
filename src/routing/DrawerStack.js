import React from 'react';

// react-navigation dependencies
import { createDrawerNavigator } from '@react-navigation/drawer';

// MainStack of screens for the application
import { MainStack } from './MainStack';

// A custom drawer for the application
import { NavigationDrawer } from '../components/navigation/Drawer';

// Generates the drawer navigator components
const Drawer = createDrawerNavigator();

export const DrawerStack = () => (
	<Drawer.Navigator
		initialRouteName='Screen'
		drawerContent={(props) => <NavigationDrawer {...props} />}
	>
		<Drawer.Screen
			name='Screen'
			component={MainStack}
			options={{
				headerShown: false
			}}
		/>
	</Drawer.Navigator>
);
