import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialBottomTabNavigator();

const MaterialBottomTabs = withLayoutContext(Navigator);

export default MaterialBottomTabs;
