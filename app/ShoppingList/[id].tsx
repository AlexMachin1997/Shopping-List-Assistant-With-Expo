// Core react dependencies
import * as React from 'react';
import { RefreshControl, ScrollView } from 'react-native';

// Routing dependencies
import { useLocalSearchParams, useFocusEffect, useRouter } from 'expo-router';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// react-native-paper dependencies
import { TextInput, Snackbar, Portal } from 'react-native-paper';

// Application components
import { Empty, Loading } from '../../src/components/screen-states';
import { ActionButtons } from '../../src/components/action-blocks';
import { ShoppingListCard } from '../../src/components/cards';
import { Text, Modal } from '../../src/components/core';

// Screen assets
import EmptyIcon from '../../assets/Shopping-Basket.png';

// Application hooks
import {
	useSnackBar,
	useProfile,
	useShoppingList,
	useShoppingLists,
	usePullRefetch,
	useFocusRefetch
} from '../../src/hooks';

// Application Services
import ShoppingListService from '../../src/components/services/ShoppingListService';
import { ProfileTheme } from '../../types/profile';

const ShoppingList = () => {
	// Controls the add item modal visibility
	const [isAddItemsModalVisible, setIsAddItemsModalVisible] = React.useState(false);

	// Controls the rename shopping list modal visibility
	const [isRenameShoppingListModalVisible, setIsRenameShoppingListModalVisible] =
		React.useState(false);

	// Controls the delete shopping list modal visibility
	const [isDeleteShoppingListModalVisible, setIsDeleteShoppingListModalVisible] =
		React.useState(false);

	// Stores the new item name, it's only updated when using the add item modal is in use
	const [itemName, setItemName] = React.useState('');

	// Stores the new shopping list name,  it's only updated when using the rename shopping list modal is in use
	const [newShoppingListName, setNewShoppingListName] = React.useState('');

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, white } = useTheme();

	// Access the current routes url search parameters e.g. title (Used as the page title)
	const { title, id } = useLocalSearchParams<{ title: string; id: string }>();

	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { profile } = useProfile();

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the current shopping lists data, used to perform additional operations outside of TanStack query e.g. generating a new shopping list or shoppings lists via the ShoppingListService
	const {
		shoppingLists,
		shoppingListsFetchStatus,
		queryKey: shoppingListsQueryKey
	} = useShoppingLists();

	// Access the current shopping list
	const {
		shoppingList,
		shoppingListFetchStatus,
		shoppingListMutateStatus,
		mutate: updateShoppingList,
		refetch: refetchShoppingList
	} = useShoppingList({
		onSuccess: ({ variables }) => {
			// Get the type of action being performed
			const actionType = variables?.type ?? '';

			switch (actionType) {
				case 'CREATE_SHOPPING_LIST_ITEM': {
					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: `You have successfully renamed the shopping list to ${itemName}`
						}
					});

					// Reset the item name
					setItemName('');

					// Close the modal down
					setIsAddItemsModalVisible(false);

					break;
				}

				case 'DELETE_SHOPPING_LIST_ITEM': {
					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: 'You have successfully deleted the shopping list item.'
						}
					});

					break;
				}

				case 'RENAME_SHOPPING_LIST': {
					// Hide the isRenameShoppingListModalVisible
					setIsRenameShoppingListModalVisible(false);

					// Update the Expo Router title param
					router.setParams({ title: newShoppingListName });

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: `You have successfully renamed the shopping list to ${newShoppingListName}`
						}
					});

					break;
				}

				case 'DELETE_SHOPPING_LIST': {
					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: `You have successfully deleted the shopping list, you will be redirected shortly`
						}
					});

					// Close the modal
					setIsDeleteShoppingListModalVisible(false);

					// Navigate back to the Shopping Lists tab screen after 1 second
					setTimeout(() => {
						router.push('(tabs)/ShoppingLists');
					}, 1000);

					break;
				}

				default: {
					break;
				}
			}
		},
		onError: ({ variables }) => {
			// Get the type of action being performed
			const actionType = variables?.type ?? '';

			switch (actionType) {
				case 'CREATE_SHOPPING_LIST_ITEM': {
					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: `Failed to rename the shopping list to ${itemName}`
						}
					});

					// Reset the item name
					setItemName('');

					// Close the modal down
					setIsAddItemsModalVisible(false);

					break;
				}

				case 'DELETE_SHOPPING_LIST_ITEM': {
					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: 'Failed to delete the shopping list item you selected'
						}
					});

					break;
				}

				case 'RENAME_SHOPPING_LIST': {
					// Hide the isRenameShoppingListModalVisible
					setIsRenameShoppingListModalVisible(false);

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: `Failed to rename the shopping list to ${newShoppingListName}`
						}
					});

					break;
				}

				case 'DELETE_SHOPPING_LIST': {
					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: `Failed to delete the shopping list`
						}
					});

					// Close the modal
					setIsDeleteShoppingListModalVisible(false);

					break;
				}

				default: {
					break;
				}
			}
		},
		shoppingListId: typeof id === 'string' ? id : null,
		isQueryEnabled: shoppingListsFetchStatus !== 'loading',
		shoppingListsQueryKey
	});

	// On load or when the screen is focussed set the shopping list name and the single shopping list
	// NOTE: Once this page is created the useEffects don't run again as they are still mounted in the background so the useFocusEffect is used to ensure the newShoppingListName is the title of the page
	useFocusEffect(
		React.useCallback(() => {
			setNewShoppingListName(title);
		}, [title])
	);

	// Handles pull refresh functionality for the shopping lists query, when you pull down in the scroll view it wil refetch the data from the expo-secure-store
	const { handleRefetch, isRefreshing } = usePullRefetch(refetchShoppingList);

	// Handles screen focussing functionality for the shopping lists query, executes every-time you re-visit the page after the initial visit.
	useFocusRefetch(refetchShoppingList);

	const addItem = () => {
		// CAdd a new item to the shopping list item
		const { shoppingList: newShoppingList = null, shoppingLists: newShoppingLists = [] } =
			ShoppingListService.CreateShoppingListItem({
				shoppingLists,
				shoppingList,
				name: itemName
			});

		// Update async storage and invalidate the "shopping list" and "shopping lists"
		updateShoppingList({
			type: 'CREATE_SHOPPING_LIST_ITEM',
			payload: {
				shoppingLists: newShoppingLists,
				shoppingList: newShoppingList
			}
		});
	};

	const deleteItem = (itemId = '') => {
		// Delete the shopping list item
		const { shoppingList: newShoppingList = null, shoppingLists: newShoppingLists = [] } =
			ShoppingListService.DeleteShoppingListItem({
				shoppingList,
				shoppingLists,
				shoppingListItemId: itemId
			});

		// Update async storage and invalidate the "shopping list" and "shopping lists"
		updateShoppingList({
			type: 'DELETE_SHOPPING_LIST_ITEM',
			payload: {
				shoppingLists: newShoppingLists,
				shoppingList: newShoppingList
			}
		});
	};

	const updateShoppingListName = () => {
		// Update the shopping list name
		const { shoppingList: newShoppingList = null, shoppingLists: newShoppingLists = [] } =
			ShoppingListService.RenameShoppingList({
				shoppingList,
				shoppingLists,
				shoppingListName: newShoppingListName
			});

		// Update async storage and invalidate the "shopping list" and "shopping lists"
		updateShoppingList({
			type: 'RENAME_SHOPPING_LIST',
			payload: {
				shoppingLists: newShoppingLists,
				shoppingList: newShoppingList
			}
		});
	};

	const toggleComplete = (itemId = '') => {
		// Update the current shopping lists item
		const { shoppingList: newShoppingList = null, shoppingLists: newShoppingLists = [] } =
			ShoppingListService.ToggleShoppingListItem({
				shoppingList,
				shoppingLists,
				shoppingListItemId: itemId
			});

		// Update async storage and invalidate the "shopping list" and "shopping lists"
		updateShoppingList({
			type: 'TOGGLE_SHOPPING_LIST_ITEM',
			payload: {
				shoppingLists: newShoppingLists,
				shoppingList: newShoppingList
			}
		});
	};

	const deleteShoppingList = () => {
		// Remove the shopping list from the shopping lists
		const { shoppingList: newShoppingList = null, shoppingLists: newShoppingLists = [] } =
			ShoppingListService.DeleteShoppingList({
				shoppingList,
				shoppingLists
			});

		// Update async storage and invalidate the "shopping list" and "shopping lists"
		updateShoppingList({
			type: 'DELETE_SHOPPING_LIST',
			payload: {
				shoppingLists: newShoppingLists,
				shoppingList: newShoppingList
			}
		});
	};

	// Render the loading screen whilst the shopping lists are being fetched
	if (shoppingListFetchStatus === 'loading') {
		return <Loading isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK} />;
	}

	return (
		<Portal.Host>
			<Modal
				visible={isAddItemsModalVisible}
				title='Create an item'
				onDismiss={() => {
					// Close the modal
					setIsAddItemsModalVisible((prevState) => !prevState);

					// Reset the modal related state e.g. item name
					setItemName('');
				}}
				onCancel={() => {
					// Close the modal
					setIsAddItemsModalVisible((prevState) => !prevState);

					// Reset the modal related state e.g. item name
					setItemName('');
				}}
				onOk={addItem}
				submitDisabled={(itemName?.length ?? 0) < 1 || snackBarState.visible === true}
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				accessabilityCancelHint='Stop creating a new shopping list item'
				accessabilityOkHint='Create a new shopping list item'
			>
				<TextInput
					placeholder='Enter an item name'
					value={itemName}
					onChangeText={(value) => setItemName(value)}
					underlineColor='transparent'
					mode='flat'
					accessibilityLabel='An input for providing a new item name for your current shopping list'
					accessibilityHint='You can easily add a new item to your current shopping'
				/>
			</Modal>

			<Modal
				visible={isRenameShoppingListModalVisible}
				title='Renaming Shopping list'
				onDismiss={() => {
					// Close the modal down
					setIsRenameShoppingListModalVisible(false);

					// Reset the shopping list name to the previously set shopping list name
					setNewShoppingListName(title);
				}}
				onCancel={() => {
					// Close the modal down
					setIsRenameShoppingListModalVisible(false);

					// Reset the shopping list name to the previously set shopping list name
					setNewShoppingListName(title);
				}}
				onOk={updateShoppingListName}
				submitDisabled={
					newShoppingListName.length === 0 ||
					newShoppingListName === title ||
					snackBarState.visible === true
				}
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				accessabilityCancelHint='Stop renaming your current shopping list'
				accessabilityOkHint='Rename the current shopping list'
			>
				<TextInput
					placeholder='Enter an item name'
					value={newShoppingListName}
					onChangeText={(value) => setNewShoppingListName(value)}
					underlineColor='transparent'
					mode='flat'
					accessibilityLabel='A user input for updating the current shopping lists name'
					accessibilityHint='A user input for updating the current shopping lists name'
				/>
			</Modal>

			<Modal
				visible={isDeleteShoppingListModalVisible}
				title='Delete list confirmation'
				onDismiss={() => {
					// Close the modal down
					setIsDeleteShoppingListModalVisible(false);
				}}
				onCancel={() => {
					// Close the modal down
					setIsDeleteShoppingListModalVisible(false);
				}}
				onOk={deleteShoppingList}
				submitDisabled={snackBarState.visible === true}
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				accessabilityCancelHint='Cancel the delete shopping list action'
				accessabilityOkHint='Delete the current shopping list, you will be redirected back to the homepage after.'
			>
				<Text size='19px'>
					Looks like you want to delete the shopping list. Would you like to proceed?
				</Text>
			</Modal>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor:
						(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? darkBlue : lightBlue,
					position: 'relative'
				}}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefetch} />}
			>
				{(shoppingList?.items?.length ?? 0) < 1 ? (
					<Empty
						image={EmptyIcon}
						label='No shopping list items exist'
						heading='No shopping list items exist'
						overview='Why not try adding one ?'
						isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
					/>
				) : (
					shoppingList?.items?.map(
						(item) =>
							(
								<ShoppingListCard
									key={item.id}
									toggle={() => toggleComplete(item?.id ?? null)}
									isComplete={item?.completed ?? false}
									name={item?.name ?? 'N/A'}
									deleteAction={() => deleteItem(item?.id ?? null)}
									isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
									shoppingListTheme={shoppingList?.shoppingListTheme ?? 'blue'}
									disabled={shoppingListMutateStatus === 'loading'}
								/>
							) ?? null
					)
				)}
			</ScrollView>

			<Snackbar
				visible={snackBarState.visible}
				onDismiss={() => {
					// Dispatch an action to reset the snackbar state
					updateSnackBarState({
						type: 'RESET_TOAST_NOTIFICATION'
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

			{snackBarState.visible === false && (
				<ActionButtons
					actions={[
						{
							icon: 'rename-box',
							label: 'Rename list',
							onPress: () => {
								setIsRenameShoppingListModalVisible(true);
							},
							color: 'grey',
							accessibilityLabel: 'Rename modal',
							size: 'medium'
						},
						{
							icon: 'delete',
							label: 'Delete list',
							onPress: () => {
								setIsDeleteShoppingListModalVisible(true);
							},
							color: 'grey',
							accessibilityLabel: 'Delete the shopping list',
							size: 'medium'
						},
						{
							icon: 'plus-circle',
							label: 'Add item',
							onPress: () => {
								setIsAddItemsModalVisible(true);
							},
							color: 'grey',
							accessibilityLabel: 'Add an item to the shopping list',
							size: 'medium'
						}
					]}
				/>
			)}
		</Portal.Host>
	);
};

export default ShoppingList;
