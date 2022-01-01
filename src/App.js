import React from 'react';

import { Loading } from './components/screen-states';

import { DrawerStack } from './routing/DrawerStack';
import { WelcomeStack } from './routing/WelcomeStack';

// custom hooks
import { useUserProfile } from './hooks';

import { ShoppingListProvider } from './context';

export default () => {
	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { state } = useUserProfile();

	// Whilst restoring or setting up the profile
	if (state.isRestoringProfile === true) return <Loading isDark={state.theme === 'dark'} />;

	// When the user hasn't completed the setup forward them to the WelcomeStack aka the tutorial
	if (state.hasCompletedSetup === false) {
		return <WelcomeStack />;
	}

	// If none of the above is met just forward the user to the main application stack
	return (
		<ShoppingListProvider>
			<DrawerStack />
		</ShoppingListProvider>
	);
};
