import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/Welcome';

const Stack = createStackNavigator();

export const WelcomeStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
		<Stack.Screen name='Welcome' component={WelcomeScreen} />
	</Stack.Navigator>
);
