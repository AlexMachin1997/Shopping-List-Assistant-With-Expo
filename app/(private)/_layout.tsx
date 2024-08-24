/* eslint-disable react/style-prop-object */
import { NavigationDrawer } from '@/components/navigation/Drawer';
import { Loading } from '@/components/screen-states';
import { useProfile } from '@/hooks';
import { Drawer } from '@/layouts';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AppLayout = () => {
	const { fetchProfileStatus, profile } = useProfile();

	if (fetchProfileStatus === 'pending') {
		return <Loading isDark={false} />;
	}

	// TODO: Add some form of error page or error boundary
	if (fetchProfileStatus === 'error') {
		return null;
	}

	if (fetchProfileStatus === 'success' && (profile?.hasCompletedSetup ?? false) === false) {
		return <Redirect href='/onboarding' />;
	}

	return (
		<>
			<StatusBar style='light' />
			<Drawer
				drawerContent={() => <NavigationDrawer />}
				screenOptions={{
					headerShown: false
				}}
				defaultStatus='closed'
			>
				{/* Register the tabs stack, includes the shopping lists and store tracker pages */}
				<Drawer.Screen name='(tabs)' />

				{/* Registers the settings stack, includes a single screen which allows you to delete data or change the theme of the app */}
				<Drawer.Screen name='settings' options={{ title: 'Settings' }} />

				{/* Registers the shopping list page, includes a single screen to view a single shopping list (Navigated via the tabs stack */}
				<Drawer.Screen name='ShoppingList' options={{ headerShown: false }} />
			</Drawer>
		</>
	);
};

export default AppLayout;
