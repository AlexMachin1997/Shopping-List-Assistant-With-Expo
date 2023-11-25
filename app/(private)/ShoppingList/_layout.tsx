import truncate from 'lodash/truncate';
import { useTheme } from 'styled-components';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Stack } from '@/layouts';
import { HeaderIcon } from '@/components/navigation/Header';
import { useShoppingList, useShoppingLists } from '@/hooks';

const ShoppingListLayout = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue } = useTheme();

	// Get the current page parameters
	// const { title } = useGlobalSearchParams<{ title: string }>();

	// Access the current routes url search parameters e.g. title (Used as the page title)
	const { id = '' } = useLocalSearchParams<{ id: string }>();

	// Access the current shopping lists data, used to perform additional operations outside of TanStack query e.g. generating a new shopping list or shoppings lists via the ShoppingListService
	const { shoppingListsFetchStatus, queryKey: shoppingListsQueryKey } = useShoppingLists();

	// Access the current shopping list
	const { shoppingList } = useShoppingList({
		shoppingListId: typeof id === 'string' ? id : null,
		isQueryEnabled: shoppingListsFetchStatus !== 'pending',
		shoppingListsQueryKey
	});

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
					title: truncate(shoppingList?.name ?? ''),
					headerRight: () => null,
					headerLeft: () => (
						<HeaderIcon
							action={() => {
								// Go back to the previous screen
								router.back();
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
