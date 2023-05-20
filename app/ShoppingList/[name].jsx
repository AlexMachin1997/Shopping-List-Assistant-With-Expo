// Core react dependencies
import * as React from 'react';
import { ScrollView } from 'react-native';

// expo-router dependencies
import { useLocalSearchParams, useFocusEffect, useRouter } from 'expo-router';

// styled-components dependencies
import { useTheme } from 'styled-components';

// react-native-paper dependencies
import { TextInput, Snackbar } from 'react-native-paper';

// application components
import { Empty, Loading } from '../../src/components/screen-states';
import { ActionButtons } from '../../src/components/action-blocks';
import { ShoppingListCard } from '../../src/components/cards';
import { Text, Modal } from '../../src/components/core';

// Screen assets
import EmptyIcon from '../../assets/Shopping-Basket.png';

// Custom hooks
import { useUserProfile, useShoppingList, useSnackBar } from '../../src/hooks';

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
	const { darkBlue, lightBlue, green, white } = useTheme();

	// Access the "expo-router" internals
	const { title } = useLocalSearchParams();
	const router = useRouter();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { state: userProfileState } = useUserProfile();

	// Access the global shopping list related state
	const { state: shoppingListState, dispatch: updateShoppingListState } = useShoppingList();

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// On load or when the screen is focussed set the shopping list name and the single shopping list
	// NOTE: Once this page is created the useEffects don't run again as they are still mounted in the background so the useFocusEffect is used to ensure the newShoppingListName is the title of the page
	useFocusEffect(
		React.useCallback(() => {
			setNewShoppingListName(title);
		}, [title])
	);

	const addItem = () => {
		// Update the shopping lists state with the newly added item
		updateShoppingListState({
			type: 'CREATE_SHOPPING_LIST_ITEM',
			payload: {
				shoppingListItemName: itemName
			}
		});

		// Dispatch an action to set the snackbar state
		updateSnackBarState({
			type: 'SET_SNACKBAR_STATE',
			payload: {
				visible: true,
				content: `You have successfully renamed the shopping list to ${itemName}`
			}
		});

		// Reset the item name
		setItemName('');

		// Close the modal down
		setIsAddItemsModalVisible(false);
	};

	const deleteItem = (itemId = '') => {
		// Update the shopping lists state with the newly added item
		updateShoppingListState({
			type: 'DELETE_SHOPPING_LIST_ITEM',
			payload: {
				itemId
			}
		});

		// Dispatch an action to set the snackbar state
		updateSnackBarState({
			type: 'SET_SNACKBAR_STATE',
			payload: {
				visible: true,
				content: 'You have successfully deleted the shopping list item.'
			}
		});
	};

	const updateShoppingListName = () => {
		// Update the shopping list state with the new name provided
		updateShoppingListState({
			type: 'RENAME_SHOPPING_LIST',
			payload: {
				shoppingListName: newShoppingListName
			}
		});

		// Hide the isRenameShoppingListModalVisible
		setIsRenameShoppingListModalVisible(false);

		// Update the Expo Router title param
		router.setParams({ title: newShoppingListName });

		// Dispatch an action to set the snackbar state
		updateSnackBarState({
			type: 'SET_SNACKBAR_STATE',
			payload: {
				visible: true,
				content: `You have successfully renamed the shopping list to ${newShoppingListName}`
			}
		});
	};

	const toggleComplete = (itemId = '') => {
		// Dispatch the toggle shopping list item action
		updateShoppingListState({
			type: 'TOGGLE_SHOPPING_LIST_ITEM',
			payload: {
				itemId
			}
		});
	};

	const deleteShoppingList = () => {
		// Dispatch the delete shopping list action
		updateShoppingListState({
			type: 'DELETE_SHOPPING_LIST'
		});

		// Dispatch an action to set the snackbar state
		updateSnackBarState({
			type: 'SET_SNACKBAR_STATE',
			payload: {
				visible: true,
				content: `You have successfully deleted the shopping list, you will be redirected shortly`
			}
		});

		// Close the modal
		setIsDeleteShoppingListModalVisible(false);

		// Navigate back to the Shopping Lists tab screen after 1 second
		setTimeout(() => {
			router.push('(tabs)');
		}, 1000);
	};

	// Render the loading screen whilst the shopping lists are being fetched
	if (shoppingListState.isRestoringShoppingLists === true) {
		return <Loading isDark={userProfileState.theme === 'dark'} />;
	}

	return (
		<>
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
				isDark={userProfileState.theme === 'dark'}
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
					setNewShoppingListName(title ?? '');
				}}
				onOk={updateShoppingListName}
				submitDisabled={
					newShoppingListName.length === 0 ||
					newShoppingListName === title ||
					snackBarState.visible === true
				}
				isDark={userProfileState.theme === 'dark'}
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
				isDark={userProfileState.theme === 'dark'}
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
					backgroundColor: userProfileState.theme === 'dark' ? darkBlue : lightBlue,
					position: 'relative'
				}}
			>
				{(shoppingListState?.shoppingList?.items?.length ?? 0) < 1 ? (
					<Empty
						image={EmptyIcon}
						label='No shopping list items exist'
						heading='No shopping list items exist'
						overview='Why not try adding one ?'
						isDark={userProfileState.theme === 'dark'}
					/>
				) : (
					shoppingListState?.shoppingList?.items?.map(
						(item) =>
							(
								<ShoppingListCard
									key={item.id}
									toggle={() => toggleComplete(item?.id ?? null)}
									isComplete={item?.completed ?? false}
									name={item?.name ?? 'N/A'}
									deleteAction={() => deleteItem(item?.id ?? null)}
									isDark={userProfileState.theme === 'dark'}
									shoppingListTheme={shoppingListState?.shoppingListTheme ?? 'blue'}
								/>
							) ?? null
					)
				)}

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
								accessibilityLabel: 'Rename modal'
							},
							{
								icon: 'delete',
								label: 'Delete list',
								onPress: () => {
									setIsDeleteShoppingListModalVisible(true);
								},
								color: 'grey',
								accessibilityLabel: 'Delete the shopping list'
							},
							{
								icon: 'plus-circle',
								label: 'Add item',
								onPress: () => {
									setIsAddItemsModalVisible(true);
								},
								color: 'grey',
								accessibilityLabel: 'Add an item to the shopping list'
							}
						]}
					/>
				)}

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
						backgroundColor: green
					}}
				>
					<Text colour={white} size='16px'>
						{snackBarState.content}
					</Text>
				</Snackbar>
			</ScrollView>
		</>
	);
};

export default ShoppingList;
