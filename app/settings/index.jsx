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
import { useProfile, useShoppingLists, useSnackBar } from '../../src/hooks';

// Application services
import ProfileService from '../../src/components/services/ProfileService';

const Settings = () => {
	const [isDeleteShoppingListsModalVisible, setIsDeleteShoppingListsModalVisible] =
		React.useState(false);

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, brightPink, green, white } = useTheme();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const {
		profile,
		mutate: updateProfile,
		updateProfileStatus
	} = useProfile({
		onSuccess: ({ variables }) => {
			// Get the type of action being performed
			const actionType = variables?.type ?? '';

			if (actionType === 'THEME_CHANGE') {
				// Dispatch an action to set the snackbar state
				updateSnackBarState({
					type: 'SET_SNACKBAR_STATE',
					payload: {
						visible: true,
						content: `Your theme has successfully been updated to ${variables.payload.profile.theme}`,
						backgroundColour: green
					}
				});
			}
		},
		onError: ({ variables }) => {
			const actionType = variables?.type ?? '';

			if (actionType === 'THEME_CHANGE') {
				// Dispatch an action to set the snackbar state
				updateSnackBarState({
					type: 'SET_SNACKBAR_STATE',
					payload: {
						visible: true,
						content: 'Your theme was not successfully updated, please try again.',
						backgroundColour: 'red'
					}
				});
			}
		}
	});

	// Access the global shopping list related state
	const { mutate: updateShoppingList, shoppingListsMutationStatus } = useShoppingLists({
		onSuccess: ({ variables }) => {
			const actionType = variables?.type ?? '';

			if (actionType === 'RESET_SHOPPING_LISTS') {
				// Close down the shopping lists deletion confirmation modal
				setIsDeleteShoppingListsModalVisible(false);

				// Dispatch an action to set the snackbar state
				updateSnackBarState({
					type: 'SET_SNACKBAR_STATE',
					payload: {
						visible: true,
						content: `You have successfully cleared your shopping lists.`,
						backgroh: green
					}
				});
			}
		},
		onError: ({ variables }) => {
			// Get the type of action being performed
			const actionType = variables?.type ?? '';

			if (actionType === 'RESET_SHOPPING_LISTS') {
				// Close down the shopping lists deletion confirmation modal
				setIsDeleteShoppingListsModalVisible(false);

				// Dispatch an action to set the snackbar state
				updateSnackBarState({
					type: 'SET_SNACKBAR_STATE',
					payload: {
						visible: true,
						content: `Your shopping lists were not successfully cleared, please try again.`,
						backgroundColor: 'red'
					}
				});
			}
		}
	});

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor: (profile?.theme ?? 'light') === 'dark' ? darkBlue : lightBlue
			}}
		>
			<Modal
				isDark={(profile?.theme ?? 'light') === 'dark'}
				visible={isDeleteShoppingListsModalVisible}
				title='Delete shopping lists'
				onDismiss={() => setIsDeleteShoppingListsModalVisible(false)}
				onCancel={() => setIsDeleteShoppingListsModalVisible(false)}
				onOk={() => {
					// Trigger the delete shopping lists action
					updateShoppingList({
						type: 'DELETE_SHOPPING_LISTS',
						payload: {
							shoppingLists: []
						}
					});

					// Close down the shopping lists deletion confirmation modal
					setIsDeleteShoppingListsModalVisible(false);
				}}
				submitDisabled={false}
				accessabilityCancelHint='Cancel the delete action, your shopping lists wil still be available'
				accessabilityOkHint='Confirm you want to delete all available shopping lists'
			>
				<Text colour={lightBlue} size='20px'>
					Are you sure you want to delete all of your shopping lists ?
				</Text>
			</Modal>

			<Section
				isDark={(profile?.theme ?? 'light') === 'dark'}
				paddingTop='0'
				paddingBottom='0'
				paddingLeft='0'
				paddingRight='0'
				marginTop='16px'
				marginBottom='0'
				marginLeft='16px'
				marginRight='0'
			>
				<Section isDark={(profile?.theme ?? 'light') === 'dark'}>
					<Text colour={(profile?.theme ?? 'light') === 'dark' ? lightBlue : darkBlue}>
						Enable dark mode theme
					</Text>
					<Switch
						value={(profile?.theme ?? 'light') === 'dark'}
						onValueChange={() => {
							// Trigger the theme update action
							updateProfile({
								type: 'THEME_CHANGE',
								payload: {
									profile: ProfileService.ChangeTheme({ profile })
								}
							});
						}}
						style={{
							paddingTop: 5,
							paddingBottom: 5
						}}
						disabled={updateProfileStatus === 'loading'}
						color='white'
					/>
				</Section>
			</Section>

			<Divider
				style={{
					backgroundColor: (profile?.theme ?? 'light') === 'dark' ? lightBlue : darkBlue,
					height: 1
				}}
			/>

			<Section
				isDark={(profile?.theme ?? 'light') === 'dark'}
				paddingTop='0'
				paddingBottom='0'
				paddingLeft='0'
				paddingRight='0'
				marginTop='16px'
				marginBottom='16px'
				marginLeft='16px'
				marginRight='0'
			>
				<Text colour={(profile?.theme ?? 'light') === 'dark' ? lightBlue : darkBlue}>
					Delete all shopping lists
				</Text>

				<Button
					isCompact
					mode='contained'
					text='Delete'
					colour={brightPink}
					label='Delete shopping lists'
					accessabilityHint='Deletes all the shopping lists you the user has created'
					onClick={() => setIsDeleteShoppingListsModalVisible(true)}
					isDark={(profile?.theme ?? 'light') === 'dark'}
					isDisabled={shoppingListsMutationStatus === 'loading'}
					labelStyle={{
						color: 'white'
					}}
					contentStyle={{
						borderRadius: 5
					}}
				/>
			</Section>

			<Divider
				style={{
					backgroundColor: (profile?.theme ?? 'light') === 'dark' ? lightBlue : darkBlue,
					height: 1
				}}
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
		</ScrollView>
	);
};

export default Settings;
