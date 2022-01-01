// Core react dependencies
import * as React from 'react';

import { ShoppingListContext } from '../context';

const useShoppingList = () => {
	const context = React.useContext(ShoppingListContext);

	if (!context) throw Error('useShoppingList requires a ShoppingListContext');

	return context;
};

export default useShoppingList;
