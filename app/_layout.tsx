// Core react dependencies
import * as React from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

// react-native-paper dependencies
import {
	DefaultTheme as ReactNativePaperTheme,
	Provider as PaperProvider
} from 'react-native-paper';

// Styled-components dependencies
import { ThemeProvider } from 'styled-components';

// TanStack query dependencies
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';

// Routing dependencies
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationDrawer } from '../src/components/navigation/Drawer';
import { Drawer } from '../src/layouts';

// Application contexts
import { AuthenticationProvider } from '../src/context';
import { StyledComponentsTheme } from '../src/constants/Themes';

// When the app focusses refetch all the queries
function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== 'web') {
		focusManager.setFocused(status === 'active');
	}
}

const IndexLayout = () => {
	const queryClient = React.useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						keepPreviousData: true
					},
					mutations: {
						retry: 3
					}
				}
			}),
		[]
	);

	// When the app refocuses refetch the data
	React.useEffect(() => {
		const subscription = AppState.addEventListener('change', onAppStateChange);

		return () => subscription.remove();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={StyledComponentsTheme}>
					<PaperProvider theme={ReactNativePaperTheme}>
						<AuthenticationProvider>
							{/* Wrap the application in a global drawer */}
							<Drawer
								drawerContent={() => <NavigationDrawer />}
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
						</AuthenticationProvider>
					</PaperProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
};

export default IndexLayout;
