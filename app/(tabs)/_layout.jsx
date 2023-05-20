// Styled-components dependencies
import { useTheme } from 'styled-components';

// Expo dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Routing dependencies
import { useRouter } from 'expo-router';
import { Tabs } from '../../src/layouts';

// Application components
import { HeaderIcon } from '../../src/components/navigation/Header';

const TabsLayout = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Tabs
			barStyle={{
				backgroundColor: darkBlue,
				borderTopColor: lightBlue,
				borderWidth: 2,
				borderStyle: 'solid'
			}}
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
					paddingTop: 3
				},
				tabBarInactiveTintColor: 'white',
				tabBarActiveTintColor: 'white',
				headerRight: () => (
					<HeaderIcon
						icon='settings'
						marginRight={10}
						action={() => {
							router.push('/settings');
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
