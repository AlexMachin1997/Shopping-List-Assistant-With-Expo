import {
	// Import the creation function
	createDrawerNavigator
	// // Import the types
	// DrawerNavigationOptions
} from '@react-navigation/drawer';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createDrawerNavigator();

// This can be used like `<Drawer />`
const Drawer = withLayoutContext(Navigator);

export default Drawer;
