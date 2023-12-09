import { useTheme } from 'styled-components';
import { useRouter } from 'expo-router';

import { Stack } from '@/layouts';
import { HeaderIcon } from '@/components/navigation/Header';

const SettingsLayout = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue } = useTheme();

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
				headerTitleStyle: {
					color: 'white'
				},
				headerStyle: {
					backgroundColor: darkBlue
				},
				headerRight: () => null,
				headerLeft: () => (
					<HeaderIcon
						action={() => {
							router.back();
						}}
						icon='arrow-back'
						marginRight={10}
					/>
				)
			}}
		>
			<Stack.Screen name='index' options={{ title: 'Settings' }} />
		</Stack>
	);
};

export default SettingsLayout;
