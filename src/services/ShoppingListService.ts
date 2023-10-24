import shortid from 'shortid';
import { ShoppingList, ShoppingListItem } from '../../../types/ShoppingList';

class ShoppingListService {
	static CreateShoppingList({
		shoppingLists = null,
		shoppingListName = null
	}: {
		shoppingLists: ShoppingList[] | null;
		shoppingListName: string | null;
	}): {
		shoppingList?: ShoppingList;
		shoppingLists?: ShoppingList[];
	} {
		if (shoppingLists === null || shoppingListName === null) {
			return {
				shoppingList: null,
				shoppingLists: shoppingLists ?? []
			};
		}

		const red = '#e53935'; // Red with a shade of 500
		const green = '#43a047'; // Green with a shade of 500
		const blue = '#2196f3'; // Blue with a shade of 500
		const purple = '#9c27b0'; // Purple with a shade of 500

		const shoppingListThemes = [red, blue, green, purple];

		const newShoppingList: ShoppingList = {
			id: shortid.generate(),
			name: shoppingListName,
			createdOn: new Date(),
			shoppingListTheme: shoppingListThemes[Math.floor(Math.random() * shoppingListThemes.length)],
			items: []
		};

		return {
			shoppingList: newShoppingList,
			shoppingLists: [...(shoppingLists ?? []), newShoppingList]
		};
	}

	static RenameShoppingList({
		shoppingLists = null,
		shoppingList = null,
		shoppingListName = null
	}: {
		shoppingLists?: null | ShoppingList[];
		shoppingList?: ShoppingList | null;
		shoppingListName?: null | string;
	}) {
		if (shoppingLists === null || shoppingList === null || shoppingListName === null) {
			return {
				shoppingList: shoppingList ?? null,
				shoppingLists: shoppingLists ?? []
			};
		}

		// Create the new shopping list object (Copy existing properties and add the name )
		const newShoppingList = {
			...shoppingList,
			name: shoppingListName
		};

		// Copy the current shopping lists
		const newShoppingLists = [...(shoppingLists ?? [])];

		// Find the index of the shopping list you want to update
		const indexOfTheShoppingList =
			newShoppingLists.findIndex((el) => (el?.id ?? '') === newShoppingList?.id ?? '') ?? -1;

		// If the shopping index isn't -1 as in something was found update the shopping lists
		if (indexOfTheShoppingList !== -1) {
			newShoppingLists.splice(indexOfTheShoppingList, 1, newShoppingList);
		}

		return {
			shoppingList,
			shoppingLists: newShoppingLists
		};
	}

	static HandleShoppingListUpdate({
		action = {
			type: null,
			payload: null
		}
	}: {
		action:
			| {
					type: 'TOGGLE_SHOPPING_LIST_ITEM';
					payload: {
						shoppingList: ShoppingList;
						id: string;
					};
			  }
			| {
					type: 'DELETE_SHOPPING_LIST_ITEM';
					payload: {
						shoppingList: ShoppingList;
						id: string;
					};
			  }
			| {
					type: 'CREATE_SHOPPING_LIST_ITEM';
					payload: {
						name: string;
						shoppingList: ShoppingList;
					};
			  }
			| {
					type: null;
					payload: null;
			  };
	}): ShoppingList {
		const newShoppingList = action?.payload?.shoppingList ?? null;

		if (newShoppingList === null) return null;

		switch (action.type) {
			case 'TOGGLE_SHOPPING_LIST_ITEM': {
				// Find the index of the item you want to delete
				const shoppingListItemIndex = newShoppingList.items.findIndex(
					(item) => (item?.id ?? '') === action?.payload?.id ?? ''
				);

				let shoppingListItem: ShoppingListItem = null;

				// If the item index isn't -1 as in something was found delete the item
				if (shoppingListItemIndex !== -1) {
					// Get thew shopping list item
					shoppingListItem = newShoppingList?.items[shoppingListItemIndex] ?? null;

					if (shoppingListItem !== null && newShoppingList !== null) {
						// Flip the completed property e.g. true -> false
						shoppingListItem.completed = !shoppingListItem.completed;

						// Update the shopping list items array with the newly updated shopping list item
						newShoppingList.items.splice(shoppingListItemIndex, 1, shoppingListItem);
					}
				}

				return newShoppingList;
			}

			case 'DELETE_SHOPPING_LIST_ITEM': {
				// Find the index of the item you want to delete
				const shoppingListItemIndex = newShoppingList.items.findIndex(
					(item) => (item?.id ?? '') === action?.payload?.id
				);

				// If the item index isn't -1 as in something was found delete the item
				if (shoppingListItemIndex !== -1 && newShoppingList !== null) {
					newShoppingList.items.splice(shoppingListItemIndex, 1);
				}

				return newShoppingList;
			}

			case 'CREATE_SHOPPING_LIST_ITEM': {
				return {
					...newShoppingList,
					items: [
						...(newShoppingList?.items ?? []),
						{
							id: shortid.generate(),
							name: action?.payload?.name ?? '',
							createdOn: new Date(),
							completed: false
						}
					]
				};
			}

			default: {
				return null;
			}
		}
	}

	static DeleteShoppingListItem({
		shoppingList = null,
		shoppingLists = null,
		shoppingListItemId = null
	}: {
		shoppingList?: ShoppingList | null;
		shoppingLists?: ShoppingList[] | null;
		shoppingListItemId?: string | null;
	}) {
		if (shoppingList === null || shoppingLists === null || shoppingListItemId === null) {
			return {
				shoppingList: shoppingList ?? null,
				shoppingLists: shoppingLists ?? []
			};
		}

		const newShoppingLists = [...shoppingLists];

		const newShoppingList = this.HandleShoppingListUpdate({
			action: {
				type: 'DELETE_SHOPPING_LIST_ITEM',
				payload: {
					id: shoppingListItemId,
					shoppingList
				}
			}
		});

		if (newShoppingList === null)
			return {
				shoppingList: shoppingList ?? null,
				shoppingLists: shoppingLists ?? null
			};

		// Find the index of the shopping list you want to update
		const indexOfTheShoppingList = newShoppingLists.findIndex(
			(el) => (el?.id ?? '') === shoppingList?.id ?? ''
		);

		// If the shopping index isn't -1 as in something was found update the shopping lists
		if (indexOfTheShoppingList !== -1) {
			newShoppingLists.splice(indexOfTheShoppingList, 1, newShoppingList);
		}

		return {
			shoppingList: newShoppingList,
			shoppingLists: newShoppingLists
		};
	}

	static ToggleShoppingListItem({
		shoppingList = null,
		shoppingLists = null,
		shoppingListItemId = null
	}: {
		shoppingList?: ShoppingList;
		shoppingLists?: ShoppingList[] | null;
		shoppingListItemId?: null | string;
	}) {
		if (shoppingList === null || shoppingListItemId === null || shoppingLists === null) {
			return {
				shoppingList: shoppingList ?? null,
				shoppingLists: shoppingLists ?? []
			};
		}

		const newShoppingLists = [...shoppingLists];

		const newShoppingList = this.HandleShoppingListUpdate({
			action: {
				type: 'TOGGLE_SHOPPING_LIST_ITEM',
				payload: {
					id: shoppingListItemId,
					shoppingList
				}
			}
		});

		// Find the index of the shopping list you want to update
		const indexOfTheShoppingList =
			newShoppingLists?.findIndex((el) => (el?.id ?? '') === shoppingList.id) ?? -1;

		// If the shopping index isn't -1 as in something was found update the shopping lists
		if (indexOfTheShoppingList !== -1) {
			newShoppingLists.splice(indexOfTheShoppingList, 1, newShoppingList);
		}

		return {
			shoppingList: newShoppingList,
			shoppingLists: newShoppingLists
		};
	}

	static CreateShoppingListItem({
		shoppingLists = null,
		shoppingList = null,
		name = null
	}: {
		shoppingLists: ShoppingList[] | null;
		shoppingList: ShoppingList;
		name: string | null;
	}) {
		if (shoppingLists === null || shoppingList === null || name === null) {
			return {
				shoppingList: shoppingList ?? null,
				shoppingLists: shoppingLists ?? []
			};
		}

		const newShoppingLists = [...shoppingLists];

		const newShoppingList = this.HandleShoppingListUpdate({
			action: {
				type: 'CREATE_SHOPPING_LIST_ITEM',
				payload: {
					name,
					shoppingList
				}
			}
		});

		if (newShoppingList === null) {
			return {
				shoppingList: null,
				shoppingLists: shoppingLists ?? []
			};
		}

		// Find the index of the shopping list you want to update
		const indexOfTheShoppingList =
			newShoppingLists?.findIndex((el) => (el?.id ?? '') === shoppingList.id) ?? -1;

		// If the shopping index isn't -1 as in something was found update the shopping lists
		if (indexOfTheShoppingList !== -1 && newShoppingList !== null) {
			newShoppingLists.splice(indexOfTheShoppingList, 1, newShoppingList);
		}

		return {
			shoppingList: newShoppingList,
			shoppingLists: newShoppingLists
		};
	}

	static DeleteShoppingList({
		shoppingLists = null,
		shoppingList = null
	}: {
		shoppingLists: ShoppingList[] | null;
		shoppingList: ShoppingList;
	}) {
		if (shoppingLists === null || shoppingList === null) {
			return {
				shoppingList: shoppingList ?? null,
				shoppingLists: shoppingLists ?? []
			};
		}

		const newShoppingLists = [...shoppingLists];

		// Find the index of the shopping list you want to update
		const indexOfTheShoppingList = shoppingLists.findIndex(
			(el) => (el?.id ?? '') === shoppingList.id
		);

		// If the shopping index isn't -1 as in something was found update the shopping lists
		if (indexOfTheShoppingList !== -1) {
			newShoppingLists.splice(indexOfTheShoppingList, 1);
		}

		return {
			shoppingList: null,
			shoppingLists: newShoppingLists
		};
	}
}

export default ShoppingListService;
