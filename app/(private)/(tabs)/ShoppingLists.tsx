import * as React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Snackbar, Portal } from 'react-native-paper';
import { useTheme } from 'styled-components';

import { EmptyOrError, Loading } from '@/components/screen-states';
import { ActionButton } from '@/components/action-blocks';
import { Modal, Text } from '@/components/core';
import { ShoppingListsCard } from '@/components/cards';
import {
	useShoppingLists,
	useSnackBar,
	useProfile,
	useFocusRefetch,
	usePullRefetch
} from '@/hooks';
import ShoppingListService from '@/services/ShoppingListService';
import { ProfileTheme } from '@/types/Profile';

// Application assets
import EmptyIcon from '../../../assets/Shocked.png';

const ShoppingLists = () => {
	// Controls the shopping list state
	const [isCreateShoppingModalVisible, setIsCreateShoppingModalVisible] = React.useState(false);

	// Stores the new shopping list name
	const [shoppingListName, setShoppingListName] = React.useState('');

	// Use to control the snack component state
	const { state: snackBarState, dispatch: updateSnackBarState } = useSnackBar();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, white } = useTheme();

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
						type: 'SUCCESSFUL_TOAST_NOTIFICATION',
						payload: {
							message: 'You have successfully created a new shopping list'
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
						type: 'ERROR_TOAST_NOTIFICATION',
						payload: {
							message: 'You have successfully created a new shopping list'
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
	if (shoppingListsFetchStatus === 'pending') {
		return <Loading isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK} />;
	}

	return (
		<Portal.Host>
			<Modal
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				visible={isCreateShoppingModalVisible}
				title='Create a shopping list'
				onDismiss={() => {
					setIsCreateShoppingModalVisible(false);
					setShoppingListName('');
				}}
				onCancel={() => {
					setIsCreateShoppingModalVisible(false);
					setShoppingListName('');
				}}
				onOk={() => {
					// Create a blank shopping list
					const ShoppingList = ShoppingListService.CreateShoppingList({
						shoppingListName,
						shoppingLists
					});

					// Trigger the create shopping list action
					updateShoppingLists({
						type: 'CREATE_SHOPPING_LIST',
						payload: {
							shoppingLists: ShoppingList?.shoppingLists ?? null
						}
					});
				}}
				submitDisabled={shoppingListName.length < 1}
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
					backgroundColor:
						(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? darkBlue : lightBlue
				}}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefetch} />}
			>
				{(shoppingLists?.length ?? 0) < 1 ? (
					<EmptyOrError
						image={EmptyIcon}
						heading='No shopping lists exist'
						overview='Why not try adding one ?'
						isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
					/>
				) : (
					shoppingLists?.map((shoppingList) => (
						<ShoppingListsCard
							key={shoppingList?.id ?? ''}
							title={shoppingList?.name ?? ''}
							background={shoppingList?.shoppingListTheme ?? ''}
							action={() => {
								router.push({
									pathname: `/ShoppingList/${shoppingList?.id ?? ''}`
								});
							}}
						/>
					)) ?? null
				)}
			</ScrollView>

			<ActionButton
				colour={white}
				icon={isCreateShoppingModalVisible ? 'close' : 'plus'}
				action={() => setIsCreateShoppingModalVisible(true)}
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
				<Text type='custom' colour={white} size={16} text={snackBarState.content} />
			</Snackbar>
		</Portal.Host>
	);
};

export default ShoppingLists;
