import { Stack } from 'expo-router';

const AuthLayout = () => (
	<Stack initialRouteName='Onboarding'>
		<Stack.Screen name='Onboarding' options={{ headerShown: false }} />
	</Stack>
);

export default AuthLayout;
