// Core react dependencies
import * as React from 'react';
import { RefreshControl, ScrollView } from 'react-native';

// Routing dependencies
import { useRouter } from 'expo-router';

// react-native-paper dependencies
import { TextInput, Snackbar, Portal } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application assets
import EmptyIcon from '../../assets/Shocked.png';

// Application components
import { Empty, Loading } from '../../src/components/screen-states';
import { ActionButton } from '../../src/components/action-blocks';
import { Modal, Text } from '../../src/components/core';
import { ShoppingListsCard } from '../../src/components/cards';

// Application hooks
import {
	useShoppingLists,
	useSnackBar,
	useProfile,
	useFocusRefetch,
	usePullRefetch
} from '../../src/hooks';

// Application services
import ShoppingListService from '../../src/components/services/ShoppingListService';

const ShoppingLists = () => {
	// Controls the shopping list state
	const [isCreateShoppingModalVisible, setIsCreateShoppingModalVisible] = React.useState(false);

	// Stores the new shopping list name
	const [shoppingListName, setShoppingListName] = React.useState('');

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, white, green } = useTheme();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { profile } = useProfile();

	const router = useRouter();

	// Access the global shopping list related state
	const {
		shoppingLists,
		shoppingListsFetchStatus,
		mutate: updateShoppingLists,
		refetch: refetchShoppingLists
	} = useShoppingLists({
		onSuccess: ({ variables }) => {
			// Get the type of action being performed
			const actionType = variables?.type ?? '';

			switch (actionType) {
				case 'CREATE_SHOPPING_LIST': {
					// Reset the shopping list name after creating the new list
					setShoppingListName('');

					// Close the Create Shopping List Modal
					setIsCreateShoppingModalVisible(false);

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SET_SNACKBAR_STATE',
						payload: {
							visible: true,
							content: 'You have successfully created a new shopping list',
							backgroundColour: green
						}
					});

					break;
				}

				default:
					break;
			}
		},
		onError: ({ variables }) => {
			// Get the type of action being performed
			const actionType = variables?.type ?? '';

			switch (actionType) {
				case 'CREATE_SHOPPING_LIST': {
					// Reset the shopping list name after creating the new list
					setShoppingListName('');

					// Close the Create Shopping List Modal
					setIsCreateShoppingModalVisible(false);

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SET_SNACKBAR_STATE',
						payload: {
							visible: true,
							content: 'You have successfully created a new shopping list',
							backgroundColour: 'red'
						}
					});

					break;
				}

				default: {
					break;
				}
			}
		}
	});

	// Handles pull refresh functionality for the shopping lists query, when you pull down in the scroll view it wil refetch the data from the expo-secure-store
	const { handleRefetch, isRefreshing } = usePullRefetch(refetchShoppingLists);

	// Handles screen focussing functionality for the shopping lists query, executes every-time you re-visit the page after the initial visit.
	useFocusRefetch(refetchShoppingLists);

	// Whilst the shopping list is being restored show the loader state
	if (shoppingListsFetchStatus === 'loading') {
		return <Loading isDark={(profile?.theme ?? 'light') === 'dark'} />;
	}

	return (
		<Portal.Host>
			<Modal
				isDark={(profile?.theme ?? 'light') === 'dark'}
				visible={isCreateShoppingModalVisible}
				title='Create a shopping list'
				onDismiss={() => setIsCreateShoppingModalVisible(false)}
				onCancel={() => {
					setIsCreateShoppingModalVisible(false);
					setShoppingListName('');
				}}
				onOk={() => {
					// Create a blank shopping list
					const ShoppingList = new ShoppingListService.CreateShoppingList({
						shoppingListName,
						shoppingLists
					});

					// Trigger the create shopping list action
					updateShoppingLists({
						type: 'CREATE_SHOPPING_LIST',
						payload: {
							shoppingLists: ShoppingList.shoppingLists
						}
					});
				}}
				submitDisabled={shoppingListName < 1}
				accessabilityCancelHint='Cancel creating the new shopping list'
				accessabilityOkHint='Create the new shopping list'
			>
				<TextInput
					placeholder='Enter a shopping list name'
					value={shoppingListName}
					onChangeText={(value) => setShoppingListName(value)}
					underlineColor='transparent'
					mode='flat'
					accessibilityLabel='An input for creating an empty shopping list'
					accessibilityHint='An input which allows you to create a new blank shopping list'
				/>
			</Modal>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: (profile?.theme ?? 'light') === 'dark' ? darkBlue : lightBlue
				}}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefetch} />}
			>
				{(shoppingLists?.length ?? 0) < 1 ? (
					<Empty
						image={EmptyIcon}
						label='No shopping lists exist'
						heading='No shopping lists exist'
						overview='Why not try adding one ?'
						isDark={(profile?.theme ?? 'light') === 'dark'}
					/>
				) : (
					shoppingLists?.map((shoppingList) => (
						<ShoppingListsCard
							key={shoppingList?.id ?? ''}
							title={shoppingList?.name ?? ''}
							background={shoppingList?.shoppingListTheme ?? ''}
							action={() => {
								router.push({
									pathname: `/ShoppingList/${shoppingList?.id ?? ''}`,
									params: {
										title: shoppingList?.name ?? ''
									}
								});
							}}
						/>
					)) ?? null
				)}
			</ScrollView>

			<ActionButton
				colour='white'
				icon={isCreateShoppingModalVisible ? 'close' : 'plus'}
				action={() => setIsCreateShoppingModalVisible(true)}
			/>

			<Snackbar
				visible={snackBarState.visible}
				onDismiss={() => {
					// Dispatch an action to reset the snackbar state
					updateSnackBarState({
						type: 'RESET_SNACKBAR_STATE'
					});
				}}
				duration={2000}
				style={{
					backgroundColor: snackBarState.backgroundColour
				}}
			>
				<Text colour={white} size='16px'>
					{snackBarState.content}
				</Text>
			</Snackbar>
		</Portal.Host>
	);
};

export default ShoppingLists;
