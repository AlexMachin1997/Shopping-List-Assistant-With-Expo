import * as React from 'react';
import PropTypes from 'prop-types';

import shortid from 'shortid';
import { format } from 'date-fns';
import { cloneDeep } from 'lodash';
import { getItem, setItem, selectRandomShoppingListTheme } from '../utils';

export const ShoppingListContext = React.createContext();

const ShoppingListReducer = (state, { type, payload }) => {
	switch (type) {
		case 'RESET_SHOPPING_LISTS': {
			return {
				...state,
				shoppingLists: []
			};
		}

		case 'RESTORE_SHOPPING_LISTS': {
			return {
				...state,
				shoppingLists: payload?.shoppingLists ?? [],
				isRestoringShoppingLists: false
			};
		}

		case 'SET_SHOPPING_LIST': {
			return {
				...state,
				shoppingList: payload?.shoppingList ?? null
			};
		}

		case 'CREATE_SHOPPING_LIST': {
			// Copy the existing shopping lists
			const existingShoppingLists = cloneDeep(state?.shoppingLists ?? []);

			// Add the new shopping list object to the existing shopping lists
			existingShoppingLists.push({
				id: shortid.generate(),
				name: payload?.shoppingListName ?? 'N/A',
				createdOn: format(new Date(), 'Do LLLL yyyy'),
				shoppingListTheme: selectRandomShoppingListTheme(),
				items: []
			});

			// Return the state, this will trigger a redraw and some side-effects
			return {
				...state,
				shoppingLists: existingShoppingLists
			};
		}

		case 'DELETE_SHOPPING_LIST_ITEM': {
			// Copy the existing shopping list
			const existingShoppingList = cloneDeep(state?.shoppingList ?? {});

			// Copy the existing shopping lists
			const existingShoppingLists = cloneDeep(state?.shoppingLists ?? []);

			// Find the index of the item you want to delete
			const indexOfTheShoppingListItem = existingShoppingList.items.findIndex(
				(item) => item.id === payload?.itemId ?? ''
			);

			// If the item index isn't -1 as in something was found delete the item
			if (indexOfTheShoppingListItem !== -1) {
				existingShoppingList.items.splice(indexOfTheShoppingListItem, 1);
			}

			// Find the index of the shopping list you want to update
			const indexOfTheShoppingList = existingShoppingLists.findIndex(
				(el) => el.id === existingShoppingList.id
			);

			// If the shopping index isn't -1 as in something was found update the shopping lists
			if (indexOfTheShoppingList !== -1) {
				existingShoppingLists.splice(indexOfTheShoppingList, 1, existingShoppingList);
			}

			// Return the state, this will trigger a redraw and some side-effects
			return {
				...state,
				shoppingLists: existingShoppingLists,
				shoppingList: existingShoppingList
			};
		}

		case 'RENAME_SHOPPING_LIST': {
			// Copy the existing shopping list
			const existingShoppingList = cloneDeep(state?.shoppingList ?? {});

			// Copy the existing shopping lists
			const existingShoppingLists = cloneDeep(state?.shoppingLists ?? []);

			// Find the index of the shopping list you want to update
			const indexOfTheShoppingList = existingShoppingLists.findIndex(
				(el) => el.id === existingShoppingList.id
			);

			// If the shopping index isn't -1 as in something was found update the shopping lists
			if (indexOfTheShoppingList !== -1) {
				existingShoppingLists.splice(indexOfTheShoppingList, 1, {
					...existingShoppingList,
					name: payload?.shoppingListName ?? ''
				});
			}

			// Return the state, this will trigger a redraw and some side-effects
			return {
				...state,
				shoppingLists: existingShoppingLists,
				shoppingList: existingShoppingList
			};
		}

		case 'TOGGLE_SHOPPING_LIST_ITEM': {
			// Copy the existing shopping list
			const existingShoppingList = cloneDeep(state?.shoppingList ?? {});

			// Copy the existing shopping lists
			const existingShoppingLists = cloneDeep(state?.shoppingLists ?? []);

			// Find the index of the shopping list item you want to modify
			const indexOfTheItemToToggle = existingShoppingList.items.findIndex(
				(item) => item.id === payload?.itemId ?? ''
			);

			// Toggle the items completed state
			const shoppingListItem = existingShoppingList.items[indexOfTheItemToToggle];
			shoppingListItem.completed = !shoppingListItem.completed;

			// If the shopping list item index isn't -1 as in something was found update the shopping list items array with the new shopping list item
			if (indexOfTheItemToToggle !== -1) {
				existingShoppingList.items.splice(indexOfTheItemToToggle, 1, shoppingListItem);
			}

			// Find the index of the shopping list you are modifying
			const indexOfTheShoppingList = existingShoppingLists.findIndex(
				(el) => el.id === existingShoppingList.id
			);

			// If the shopping index isn't -1 as in something was found update the shopping lists
			if (indexOfTheShoppingList !== -1) {
				existingShoppingLists.splice(indexOfTheShoppingList, 1, existingShoppingList);
			}

			// Return the state, this will trigger a redraw and some side-effects
			return {
				...state,
				shoppingLists: existingShoppingLists,
				shoppingList: existingShoppingList
			};
		}

		case 'DELETE_SHOPPING_LIST': {
			// Copy the existing shopping list
			const existingShoppingList = cloneDeep(state?.shoppingList ?? {});

			// Copy the existing shopping lists
			const existingShoppingLists = cloneDeep(state?.shoppingLists ?? []);

			// Find the index of the shopping list you are modifying
			const indexOfTheShoppingList = existingShoppingLists.findIndex(
				(el) => el.id === existingShoppingList.id
			);

			// If the shopping index isn't -1 as in something was found update the shopping lists
			if (indexOfTheShoppingList !== -1) {
				existingShoppingLists.splice(indexOfTheShoppingList, 1);
			}

			// Return the state, this will trigger a redraw and some side-effects
			return {
				...state,
				shoppingLists: existingShoppingLists,
				shoppingList: null
			};
		}

		case 'CREATE_SHOPPING_LIST_ITEM': {
			// Copy the existing shopping list
			const existingShoppingList = cloneDeep(state?.shoppingList ?? {});

			// Copy the existing shopping lists
			const existingShoppingLists = cloneDeep(state?.shoppingLists ?? []);

			// Add the new shopping list item object to the existing shopping list items
			existingShoppingList.items.push({
				id: shortid.generate(),
				name: payload?.shoppingListItemName ?? '',
				createdOn: format(new Date(), 'Do LLLL yyyy'),
				completed: false
			});

			// Find the index of the shopping list you are modifying
			const indexOfTheShoppingList = existingShoppingLists.findIndex(
				(el) => el.id === existingShoppingList.id
			);

			// If the shopping index isn't -1 as in something was found update the shopping lists
			if (indexOfTheShoppingList !== -1) {
				existingShoppingLists.splice(indexOfTheShoppingList, 1, existingShoppingList);
			}

			// Return the state, this will trigger a redraw and some side-effects
			return {
				...state,
				shoppingLists: existingShoppingLists,
				shoppingList: existingShoppingList
			};
		}

		default: {
			console.warn('ShoppingListReducer: unknown action fired');

			return { ...state, isRestoringShoppingLists: false };
		}
	}
};

export const ShoppingListProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(ShoppingListReducer, {
		shoppingLists: [],
		isRestoringShoppingLists: true,
		shoppingList: null
	});

	const hasMounted = React.useRef(false);

	// Used to safely dispatch actions
	const safeDispatch = React.useCallback((...args) => {
		if (hasMounted.current === true) {
			dispatch(...args);
		}
	}, []);

	// Handle the hasMounted reference
	React.useEffect(() => {
		hasMounted.current = true;

		return () => {
			hasMounted.current = false;
		};
	}, []);

	// Handles the initial setup of the shopping list related functionality
	React.useEffect(() => {
		// Get the shopping lists from storage
		const fetchShoppingLists = async () => {
			// Get the items
			const response = await getItem('ShoppingLists');

			// Dispatch the action, this will update the Reducer state
			safeDispatch({
				type: 'RESTORE_SHOPPING_LISTS',
				payload: {
					shoppingLists: response === null ? [] : response
				}
			});
		};

		// Call the async function as soon as the Provider is used
		fetchShoppingLists();
	}, [safeDispatch]);

	React.useEffect(() => {
		// Serialize the new shopping list into storage
		const saveShoppingLists = async () => {
			await setItem('ShoppingLists', state?.shoppingLists ?? []);
		};

		// Only ever attempt to update storage when the user isn't restoring the shopping lists
		if (state.isRestoringShoppingLists === false) {
			saveShoppingLists();
		}
	}, [state.shoppingLists, state.isRestoringShoppingLists]);

	const value = React.useMemo(
		() => ({
			state,
			dispatch: safeDispatch
		}),
		[state, safeDispatch]
	);

	return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
};

ShoppingListProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.func]).isRequired
};
