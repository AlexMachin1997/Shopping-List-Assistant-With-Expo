import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';

import { registerRootComponent } from 'expo';

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components/native';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { UserProfileProvider } from './context';

import App from './App';

const EntryPoint = () => (
	<GestureHandlerRootView style={{ flex: 1 }}>
		<NavigationContainer>
			<ThemeProvider
				theme={{
					darkBlue: '#003249', // Dark blue
					lightBlue: '#CCDBDC', // Light blue/grey
					brightPink: '#e91e63', // Pink,
					green: '#4BB543', // Green,
					white: 'white' // White...
				}}
			>
				<PaperProvider theme={DefaultTheme}>
					<UserProfileProvider>
						<App />
					</UserProfileProvider>
				</PaperProvider>
			</ThemeProvider>
		</NavigationContainer>
	</GestureHandlerRootView>
);

export default registerRootComponent(EntryPoint);
