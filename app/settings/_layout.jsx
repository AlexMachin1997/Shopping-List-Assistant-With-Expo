import { Stack } from '../../src/layouts';

const SettingsLayout = () => (
	<Stack initialRouteName='index'>
		<Stack.Screen name='index' options={{ headerShown: false }} />
	</Stack>
);

export default SettingsLayout;
