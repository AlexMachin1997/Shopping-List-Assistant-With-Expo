import { useTheme } from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';

import { HeaderIcon } from '../../src/components/navigation/Header';

const TabsLayout = () => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	const router = useRouter();

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
