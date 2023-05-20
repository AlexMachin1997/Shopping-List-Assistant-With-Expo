import truncate from 'lodash/truncate';

import { useTheme } from 'styled-components';
import { useRouter } from 'expo-router';
import { HeaderIcon } from '../../src/components/navigation/Header';

import { Stack } from '../../src/layouts';

import { useShoppingList } from '../../src/hooks';

const ShoppingListLayout = () => {
	// Access the global shopping list related state
	const { dispatch: updateShoppingListState } = useShoppingList();

	const { darkBlue, lightBlue } = useTheme();

	const router = useRouter();

	return (
		<Stack initialRouteName='[name]'>
			<Stack.Screen
				name='[name]'
				options={({ navigation, route }) => ({
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
					headerLeft: (props) => (
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
