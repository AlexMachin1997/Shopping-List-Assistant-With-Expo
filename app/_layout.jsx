// Core react dependencies
import * as React from 'react';

// react-native-paper dependencies
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Styled-components dependencies
import { ThemeProvider } from 'styled-components/native';

// Routing dependencies
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationDrawer } from '../src/components/navigation/Drawer';
import { Drawer } from '../src/layouts';

// Application contexts
import { ShoppingListProvider, UserProfileProvider } from '../src/context';

const IndexLayout = () => {
	// Stores the styled-components theme colours
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
							{/* Wrap the application in a global drawer */}
							<Drawer
								drawerContent={(props) => <NavigationDrawer {...props} />}
								screenOptions={{
									headerShown: false
								}}
							>
								{/* Register the tabs stack, includes the shopping lists and store tracker pages */}
								<Drawer.Screen name='(tabs)' />

								{/* Registers the auth stack, includes the applications tutorial */}
								<Drawer.Screen name='(auth)' options={{ headerShown: false }} />

								{/* Registers the settings stack, includes a single screen which allows you to delete data or change the theme of the app */}
								<Drawer.Screen name='settings' options={{ title: 'Settings' }} />

								{/* Registers the shopping list page, includes a single screen to view a single shopping list (Navigated via the tabs stack */}
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
