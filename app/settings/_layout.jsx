import { useTheme } from 'styled-components';
import { useRouter } from 'expo-router';
import { Stack } from '../../src/layouts';
import { HeaderIcon } from '../../src/components/navigation/Header';

const SettingsLayout = () => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	const router = useRouter();

	return (
		<Stack
			initialRouteName='index'
			screenOptions={{
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
