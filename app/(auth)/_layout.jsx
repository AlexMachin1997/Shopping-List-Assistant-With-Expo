// Routing dependencies
import { Stack } from '../../src/layouts';

const AuthLayout = () => (
	<Stack initialRouteName='Onboarding'>
		<Stack.Screen name='Onboarding' options={{ headerShown: false }} />
	</Stack>
);

export default AuthLayout;
