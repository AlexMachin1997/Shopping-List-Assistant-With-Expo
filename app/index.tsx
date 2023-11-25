import { Redirect } from 'expo-router';

// In order to prevent a 404 attempt to navigate to the starting tab for the main app
// This won't render straight away as we check to see if the user needs onboarding, if they do they go to the onboarding screen otherwise they go to this screen.
export default () => <Redirect href='/(private)/(tabs)/ShoppingLists' />;
