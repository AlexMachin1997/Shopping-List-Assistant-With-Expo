// Material colours
const red = '#e53935'; // Red with a shade of 500
const green = '#43a047'; // Green with a shade of 500
const blue = '#2196f3'; // Blue with a shade of 500
const purple = '#9c27b0'; // Purple with a shade of 500

// Decide the shopping list items theme (Dictates what colour the card will have)
const shoppingListThemes = [red, blue, green, purple];

export const selectRandomShoppingListTheme = () =>
	shoppingListThemes[Math.floor(Math.random() * shoppingListThemes.length)];
