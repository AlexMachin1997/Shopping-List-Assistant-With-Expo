import 'expo-dev-client';

import * as React from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import {
	DefaultTheme as ReactNativePaperTheme,
	Provider as PaperProvider
} from 'react-native-paper';
import { ThemeProvider } from 'styled-components';
import {
	QueryClient,
	QueryClientProvider,
	focusManager,
	keepPreviousData
} from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Stack } from '@/layouts';
import { StyledComponentsTheme } from '@/constants/Themes';

// When the app focusses refetch all the queries
function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== 'web') {
		focusManager.setFocused(status === 'active');
	}
}

const IndexLayout = () => {
	// When the app refocuses refetch the data
	React.useEffect(() => {
		const subscription = AppState.addEventListener('change', onAppStateChange);

		return () => subscription.remove();
	}, []);

	const queryClient = React.useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Keep the previous data if it's not been in error state
						placeholderData: keepPreviousData,

						// Retry the query at least once
						retry: 1
					},
					mutations: {
						// Retry the mutation at least once
						retry: 1
					}
				}
			}),
		[]
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={StyledComponentsTheme}>
					<PaperProvider theme={ReactNativePaperTheme}>
						<Stack initialRouteName='(private)'>
							<Stack.Screen name='(private)' options={{ headerShown: false }} />
							<Stack.Screen name='(public)' options={{ headerShown: false }} />
						</Stack>
					</PaperProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
};

export default IndexLayout;
