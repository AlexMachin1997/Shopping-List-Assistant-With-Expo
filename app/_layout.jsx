import * as React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';

import { NavigationDrawer } from '../src/components/navigation/Drawer';

import { ShoppingListProvider, UserProfileProvider } from '../src/context';

import { Drawer } from '../src/layouts';

const IndexLayout = () => {
	const StyledComponentsTheme = React.useMemo(
		() => ({
			darkBlue: '#003249', // Dark blue
			lightBlue: '#CCDBDC', // Light blue/grey
			brightPink: '#e91e63', // Pink,
			green: '#4BB543', // Green,
			white: 'white' // White...
		}),
		[]
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider theme={StyledComponentsTheme}>
				<PaperProvider theme={DefaultTheme}>
					<UserProfileProvider>
						<ShoppingListProvider>
							<Drawer
								drawerContent={(props) => <NavigationDrawer {...props} />}
								screenOptions={{
									headerShown: false
								}}
							>
								{/* Register the tabs stack, includes the shopping lists and store tracker pages */}
								<Drawer.Screen name='(tabs)' />

								<Drawer.Screen name='(auth)' options={{ headerShown: false }} />

								{/* Registers the settings stack, allows you to delete data or change the theme of the app */}
								<Drawer.Screen name='settings' options={{ title: 'Settings' }} />

								{/* Registers the shopping list page, accessed by clicking a shopping list in the (tabs) stack */}
								<Drawer.Screen
									name='ShoppingList'
									options={() => ({
										headerShown: false // Don't show the header for this, it's generated in this stacks _layout file
									})}
								/>
							</Drawer>
						</ShoppingListProvider>
					</UserProfileProvider>
				</PaperProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};

export default IndexLayout;
