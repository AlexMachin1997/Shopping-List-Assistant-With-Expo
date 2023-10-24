export type ShoppingListItem = {
	id: string;
	completed: boolean;
	name: string;
	createdOn: Date;
} | null;

export type ShoppingList = {
	id: string;
	name: string;
	shoppingListTheme: string;
	createdOn: Date;
	items: ShoppingListItem[];
} | null;
