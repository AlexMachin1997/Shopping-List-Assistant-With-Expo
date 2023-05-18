import * as React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';

import { useRouter } from 'expo-router';
import { NavigationDrawer } from '../src/components/navigation/Drawer';

import { ShoppingListProvider, UserProfileProvider } from '../src/context';
import { Drawer } from '../src/layouts';
import { HeaderIcon } from '../src/components/navigation/Header';

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

	const router = useRouter();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider theme={StyledComponentsTheme}>
				<PaperProvider theme={DefaultTheme}>
					<UserProfileProvider>
						<ShoppingListProvider>
							<Drawer
								drawerContent={(props) => <NavigationDrawer {...props} />}
								screenOptions={({ navigation }) => ({
									headerStyle: {
										backgroundColor: StyledComponentsTheme.darkBlue,
										borderBottomColor: StyledComponentsTheme.lightBlue,
										borderTopColor: StyledComponentsTheme.darkBlue,
										borderWidth: 1,
										borderStyle: 'solid'
									},
									headerTitleStyle: {
										color: 'white'
									},
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
											icon='settings'
											marginRight={10}
											action={() => {
												router.push('/settings');
											}}
											{...props}
										/>
									)
								})}
							>
								{/* Register the tabs stack, includes the shopping lists and store tracker pages */}
								<Drawer.Screen name='(tabs)' options={{ title: 'Shopping Lists' }} />

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
