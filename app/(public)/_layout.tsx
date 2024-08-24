/* eslint-disable react/style-prop-object */
import { Stack } from '@/layouts';
import { StatusBar } from 'expo-status-bar';

const PublicStackLayout = () => (
	<>
		<StatusBar style='light' />
		<Stack
			initialRouteName='onboarding'
			screenOptions={{
				headerShown: false
			}}
		/>
	</>
);
export default PublicStackLayout;
