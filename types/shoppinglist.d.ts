declare type ShoppingListItem = {
	id: string;
	completed: boolean;
	name: string;
} | null;

declare type ShoppingList = {
	id: string;
	name: string;
	shoppingListTheme: string;
	createdOn: Date;
	items: ShoppingListItem[];
};

declare type ShoppingLists = ShoppingList[];
