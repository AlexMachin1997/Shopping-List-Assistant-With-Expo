// Core react dependencies
import * as React from 'react';
import { ScrollView } from 'react-native';

// Routing dependencies
import { useRouter } from 'expo-router';

// react-native-paper dependencies
import { TextInput, Snackbar } from 'react-native-paper';

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
import { useUserProfile, useShoppingList, useSnackBar } from '../../src/hooks';

const ShoppingLists = () => {
	// Controls the shopping list state
	const [isCreateShoppingModalVisible, setIsCreateShoppingModalVisible] = React.useState(false);

	// Stores the new shopping list name
	const [shoppingListName, setShoppingListName] = React.useState('');

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, white, green } = useTheme();

	// Access the react-navigation internal Context
	const router = useRouter();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { state: userProfileState } = useUserProfile();

	// Access the global shopping list related state
	const { state: shoppingListState, dispatch: updateShoppingListState } = useShoppingList();

	// Whilst the shopping list is being restored show the loader state
	if (shoppingListState.isRestoringShoppingLists === true) {
		return <Loading isDark={userProfileState.theme === 'dark'} />;
	}

	return (
		<>
			<Modal
				isDark={userProfileState.theme === 'dark'}
				visible={isCreateShoppingModalVisible}
				title='Create a shopping list'
				onDismiss={() => setIsCreateShoppingModalVisible(false)}
				onCancel={() => {
					setIsCreateShoppingModalVisible(false);
					setShoppingListName('');
				}}
				onOk={() => {
					// Dispatch the action to create the shopping list
					updateShoppingListState({
						type: 'CREATE_SHOPPING_LIST',
						payload: {
							shoppingListName
						}
					});

					// Reset the shopping list name after creating the new list
					setShoppingListName('');

					// Close the Create Shopping List Modal
					setIsCreateShoppingModalVisible(false);

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SET_SNACKBAR_STATE',
						payload: {
							visible: true,
							content: 'You have successfully created a new shopping list'
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
					backgroundColor: userProfileState.theme === 'dark' ? darkBlue : lightBlue
				}}
			>
				{(shoppingListState?.shoppingLists?.length ?? 0) < 1 ? (
					<Empty
						image={EmptyIcon}
						label='No shipping lists exist'
						heading='No shopping lists exist'
						overview='Why not try adding one ?'
						isDark={userProfileState.theme === 'dark'}
					/>
				) : (
					shoppingListState?.shoppingLists?.map(
						(shoppingList) =>
							(
								<ShoppingListsCard
									key={shoppingList?.id ?? ''}
									title={shoppingList?.name ?? ''}
									background={shoppingList?.shoppingListTheme ?? ''}
									action={() => {
										updateShoppingListState({
											type: 'SET_SHOPPING_LIST',
											payload: {
												shoppingList
											}
										});

										router.push({
											pathname: `/ShoppingList/${shoppingList?.id ?? ''}`,
											params: {
												title: shoppingList?.name ?? ''
											}
										});
									}}
								/>
							) ?? null
					)
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
					backgroundColor: green
				}}
			>
				<Text colour={white} size='16px'>
					{snackBarState.content}
				</Text>
			</Snackbar>
		</>
	);
};

export default ShoppingLists;
