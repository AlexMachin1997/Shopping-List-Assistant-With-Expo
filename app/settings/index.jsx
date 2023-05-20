// Core react dependencies
import * as React from 'react';
import { ScrollView } from 'react-native';

// react-native-paper dependencies
import { Divider, Switch, Snackbar } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import { Section, Text, Button, Modal } from '../../src/components/core';

// Application hooks
import { useUserProfile, useShoppingList, useSnackBar } from '../../src/hooks';

const Settings = () => {
	const [isDeleteShoppingListsModalVisible, setIsDeleteShoppingListsModalVisible] =
		React.useState(false);

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, brightPink, green, white } = useTheme();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { state: userProfileState, dispatch: updateUserProfileState } = useUserProfile();

	// Access the global shopping list related state
	const { dispatch: updateShoppingListState } = useShoppingList();

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor: userProfileState.theme === 'dark' ? darkBlue : lightBlue
			}}
		>
			<Modal
				isDark={userProfileState.theme === 'dark'}
				visible={isDeleteShoppingListsModalVisible}
				title='Delete shopping lists'
				onDismiss={() => setIsDeleteShoppingListsModalVisible(false)}
				onCancel={() => setIsDeleteShoppingListsModalVisible(false)}
				onOk={() => {
					// Dispatch the action to create the shopping list
					updateShoppingListState({
						type: 'RESET_SHOPPING_LISTS'
					});

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SET_SNACKBAR_STATE',
						payload: {
							visible: true,
							content: `You have successfully cleared your shopping lists.`
						}
					});

					// Close down the shopping lists deletion confirmation modal
					setIsDeleteShoppingListsModalVisible(false);
				}}
				submitDisabled={false}
				accessabilityCancelHint='Cancel the delete action, your shopping lists wil still be available'
				accessabilityOkHint='Confirm you want to delete all available shopping lists'
			>
				<Text colour={userProfileState.theme === 'dark' ? lightBlue : darkBlue} size='20px'>
					Are you sure you want to delete all of your shopping lists ?
				</Text>
			</Modal>

			<Section
				isDark={userProfileState.theme === 'dark'}
				paddingTop='0'
				paddingBottom='0'
				paddingLeft='0'
				paddingRight='0'
				marginTop='16px'
				marginBottom='0'
				marginLeft='16px'
				marginRight='0'
			>
				<Section isDark={userProfileState.theme === 'dark'}>
					<Text colour={userProfileState.theme === 'dark' ? lightBlue : darkBlue}>
						Enable dark mode theme
					</Text>
					<Switch
						value={userProfileState.theme === 'dark'}
						onValueChange={() => {
							// Is the application in dark mode
							const isDarkMode = userProfileState.theme === 'dark';

							// Update the users theme, this will redraw the parts of the app where the theme is referenced.
							updateUserProfileState({
								type: 'SET_USER_THEME',
								payload: { theme: isDarkMode === true ? 'light' : 'dark' }
							});
						}}
						style={{
							paddingTop: 5,
							paddingBottom: 5
						}}
						color='white'
					/>
				</Section>
			</Section>

			<Divider
				style={{
					backgroundColor: userProfileState.theme === 'dark' ? lightBlue : darkBlue,
					height: 1
				}}
			/>

			<Section
				isDark={userProfileState.theme === 'dark'}
				paddingTop='0'
				paddingBottom='0'
				paddingLeft='0'
				paddingRight='0'
				marginTop='16px'
				marginBottom='0'
				marginLeft='16px'
				marginRight='0'
			>
				<Text colour={userProfileState.theme === 'dark' ? lightBlue : darkBlue}>
					Delete all shopping lists
				</Text>
				<Section flexGrow={1} alignItems='flex-end' backgroundColour='transparent'>
					<Button
						isCompact
						mode='contained'
						text='Delete'
						colour={brightPink}
						label='Delete shopping lists'
						accessabilityHint='Deletes all the shopping lists you the user has created'
						onClick={() => setIsDeleteShoppingListsModalVisible(true)}
						isDark={userProfileState.theme === 'dark'}
						isDisabled={false}
						labelStyle={{
							color: 'white'
						}}
						contentStyle={{
							borderRadius: 5
						}}
					/>
				</Section>
			</Section>

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
	);
};

export default Settings;
