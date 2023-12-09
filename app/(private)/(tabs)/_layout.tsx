import { useTheme } from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Tabs } from '@/layouts';
import { HeaderIcon } from '@/components/navigation/Header';

const TabsLayout = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Tabs
			initialRouteName='ShoppingLists'
			safeAreaInsets={{ bottom: 0 }}
			screenOptions={({ navigation }) => ({
				headerTitleStyle: {
					color: 'white'
				},
				headerStyle: {
					backgroundColor: darkBlue,
					borderBottomColor: lightBlue,
					borderTopColor: darkBlue,
					borderWidth: 1,
					borderStyle: 'solid'
				},
				tabBarStyle: {
					backgroundColor: darkBlue,
					paddingBottom: 3,
					paddingTop: 3,
					borderWidth: 1,
					borderStyle: 'solid',
					borderTopColor: 'white'
				},
				tabBarInactiveTintColor: 'white',
				tabBarActiveTintColor: 'white',
				headerRight: () => (
					<HeaderIcon
						icon='settings'
						marginRight={10}
						action={() => {
							router.push('/settings/');
						}}
					/>
				),
				headerLeft: () => (
					<HeaderIcon
						icon='menu'
						marginLeft={10}
						action={() => {
							navigation.toggleDrawer();
						}}
					/>
				)
			})}
		>
			<Tabs.Screen
				name='ShoppingLists'
				options={{
					title: 'Shopping lists',
					tabBarLabel: 'Shopping Lists',
					tabBarIcon: () => (
						<MaterialCommunityIcons name='clipboard-text-outline' size={25} color={lightBlue} />
					)
				}}
			/>

			<Tabs.Screen
				name='StoreTracker'
				options={{
					title: 'Tracking items',
					tabBarLabel: 'Find stores',
					tabBarIcon: () => (
						<MaterialCommunityIcons name='crosshairs-gps' size={25} color={lightBlue} />
					)
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
