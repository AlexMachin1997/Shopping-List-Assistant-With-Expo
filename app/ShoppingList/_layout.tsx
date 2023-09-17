import truncate from 'lodash/truncate';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Routing dependencies
import { useRouter, useSearchParams } from 'expo-router';
import { Stack } from '../../src/layouts';

// Application components
import { HeaderIcon } from '../../src/components/navigation/Header';

const ShoppingListLayout = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue } = useTheme();

	// Get the current page parameters
	const { title } = useSearchParams<{ title: string }>();

	return (
		<Stack
			initialRouteName='[id]'
			screenOptions={{
				headerStyle: {
					backgroundColor: darkBlue
				},
				headerTitleStyle: {
					color: 'white'
				}
			}}
		>
			<Stack.Screen
				name='[id]'
				options={{
					title: truncate(title),
					headerRight: () => null,
					headerLeft: () => (
						<HeaderIcon
							action={() => {
								// Go back to the previous screen
								router.push({
									pathname: '/(tabs)/ShoppingLists'
								});
							}}
							icon='arrow-back'
							marginRight={10}
						/>
					)
				}}
			/>
		</Stack>
	);
};
export default ShoppingListLayout;
