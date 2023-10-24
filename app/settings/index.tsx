// Core react dependencies
import * as React from 'react';
import { ScrollView } from 'react-native';

// react-native-paper dependencies
import { Divider, Switch, Snackbar } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import { Section, Text, Modal, Button } from '../../src/components/core';

// Application hooks
import { useProfile, useShoppingLists, useSnackBar } from '../../src/hooks';

// Application services
import ProfileService from '../../src/components/services/ProfileService';
import { ProfileTheme } from '../../types/Profile';

const Settings = () => {
	const [isDeleteShoppingListsModalVisible, setIsDeleteShoppingListsModalVisible] =
		React.useState(false);

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, brightPink, white } = useTheme();

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const {
		profile,
		mutate: updateProfile,
		updateProfileStatus
	} = useProfile({
		onSuccess: ({ variables }) => {
			switch (variables.type) {
				case 'THEME_CHANGE': {
					updateSnackBarState({
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: `Your theme has successfully been updated to ${
								variables?.payload?.profile?.theme ?? ''
							}`
						}
					});

					break;
				}

				default:
					break;
			}
		},
		onError: ({ variables }) => {
			switch (variables.type) {
				case 'THEME_CHANGE': {
					updateSnackBarState({
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: 'Your theme was not successfully updated, please try again.'
						}
					});

					break;
				}

				default:
					break;
			}
		}
	});

	// Access the global shopping list related state
	const { mutate: updateShoppingList, shoppingListsMutationStatus } = useShoppingLists({
		onSuccess: ({ variables }) => {
			switch (variables.type) {
				case 'CLEAR_SHOPPING_LISTS': {
					// Close down the shopping lists deletion confirmation modal
					setIsDeleteShoppingListsModalVisible(false);

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: `You have successfully cleared your shopping lists.`
						}
					});

					break;
				}

				default:
					break;
			}
		},
		onError: ({ variables }) => {
			switch (variables.type) {
				case 'CLEAR_SHOPPING_LISTS': {
					// Close down the shopping lists deletion confirmation modal
					setIsDeleteShoppingListsModalVisible(false);

					// Dispatch an action to set the snackbar state
					updateSnackBarState({
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: `Your shopping lists were not successfully cleared, please try again.`
						}
					});

					break;
				}

				default:
					break;
			}
		}
	});

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor:
					(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? darkBlue : lightBlue
			}}
		>
			<Modal
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				visible={isDeleteShoppingListsModalVisible}
				title='Delete shopping lists'
				onDismiss={() => setIsDeleteShoppingListsModalVisible(false)}
				onCancel={() => setIsDeleteShoppingListsModalVisible(false)}
				onOk={() => {
					// Trigger the delete shopping lists action
					updateShoppingList({
						type: 'CLEAR_SHOPPING_LISTS',
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
				<Text
					colour={lightBlue}
					size={20}
					text='Are you sure you want to delete all of your shopping lists ?'
				/>
			</Modal>

			<Section
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				marginTop={16}
				marginLeft={16}
			>
				<Section isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}>
					<Text
						colour={
							(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? lightBlue : darkBlue
						}
						type='h2'
						text='Enable dark theme mode'
					/>

					<Switch
						value={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
						onValueChange={() => {
							if (profile !== null) {
								// Trigger the theme update action
								updateProfile({
									type: 'THEME_CHANGE',
									payload: {
										profile: ProfileService.ChangeTheme({ profile })
									}
								});
							}
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
					backgroundColor:
						(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? lightBlue : darkBlue,
					height: 1
				}}
			/>

			<Section
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				marginTop={16}
				marginBottom={16}
				marginLeft={16}
			>
				<Text
					colour={
						(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? lightBlue : darkBlue
					}
					text='Delete all shopping lists'
				/>

				<Button
					isCompact
					mode='contained'
					colour={brightPink}
					label='Delete shopping lists'
					accessabilityHint='Deletes all the shopping lists you the user has created'
					onClick={() => setIsDeleteShoppingListsModalVisible(true)}
					isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
					isDisabled={shoppingListsMutationStatus === 'loading'}
					labelStyle={{
						color: 'white'
					}}
					contentStyle={{
						borderRadius: 5
					}}
				>
					Delete
				</Button>
			</Section>

			<Divider
				style={{
					backgroundColor:
						(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? lightBlue : darkBlue,
					height: 1
				}}
			/>

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
				<Text colour={white} size={16} text={snackBarState.content} />
			</Snackbar>
		</ScrollView>
	);
};

export default Settings;
