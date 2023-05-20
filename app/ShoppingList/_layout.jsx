import truncate from 'lodash/truncate';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Routing dependencies
import { useRouter } from 'expo-router';
import { Stack } from '../../src/layouts';

// Application components
import { HeaderIcon } from '../../src/components/navigation/Header';

// Application hooks
import { useShoppingList } from '../../src/hooks';

const ShoppingListLayout = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the global shopping list related state
	const { dispatch: updateShoppingListState } = useShoppingList();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Stack initialRouteName='[name]'>
			<Stack.Screen
				name='[name]'
				options={({ route }) => ({
					headerStyle: {
						backgroundColor: darkBlue,
						borderBottomColor: lightBlue,
						borderTopColor: darkBlue,
						borderWidth: 1,
						borderStyle: 'solid'
					},
					headerTitleStyle: {
						color: 'white'
					},
					title: truncate(route.params.title),
					headerRight: null,
					headerLeft: () => (
						<HeaderIcon
							action={() => {
								// When you go back to the homepage reset the shoppingList state
								updateShoppingListState({
									type: 'SET_SHOPPING_LIST',
									payload: {
										shoppingList: null
									}
								});

								// Go back to the previous screen
								router.push('/(tabs)/ShoppingLists');
							}}
							icon='arrow-back'
							marginRight={10}
						/>
					)
				})}
			/>
		</Stack>
	);
};
export default ShoppingListLayout;
