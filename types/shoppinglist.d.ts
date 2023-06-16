declare type ShoppingListItem = {
	id: string;
	completed: boolean;
	name: string;
	createdOn: Date;
} | null;

declare type ShoppingList = {
	id: string;
	name: string;
	shoppingListTheme: string;
	createdOn: Date;
	items: ShoppingListItem[];
} | null;

declare type ShoppingLists = ShoppingList[] | null;
