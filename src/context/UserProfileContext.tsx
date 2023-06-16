// Core react dependencies
import * as React from 'react';

// Routing dependencies
import { useRouter } from 'expo-router';

// Application components
import { Loading } from '../components/screen-states';

// Application hooks
import useProfile from '../hooks/useProfile';

const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
	const hasPerformedInitialRedirect = React.useRef(false);

	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the users profile
	const { fetchProfileStatus, profile } = useProfile();

	React.useEffect(() => {
		// When the user hasn't already been redirect and the profile isn't being fetched
		if (fetchProfileStatus === 'success' && hasPerformedInitialRedirect.current === false) {
			// When the user has completed the setup then redirect them to the starting page
			if ((profile?.hasCompletedSetup ?? false) === true) {
				// Set hasPerformedInitialRedirect to true to avoid re-running effect
				hasPerformedInitialRedirect.current = true;
				// Redirect the user to the shopping list tab
				router.replace('/(tabs)/ShoppingLists');
			}

			// When the user hasn't completed the setup redirect to the onboarding screen
			if ((profile?.hasCompletedSetup ?? false) === false) {
				// Set hasPerformedInitialRedirect to true to avoid re-running effect
				hasPerformedInitialRedirect.current = true;
				// Redirect the user to the on boarding page (Welcome page)
				router.replace('/(auth)/Onboarding');
			}
		}
	}, [fetchProfileStatus, profile?.hasCompletedSetup, router]);

	// Whilst fetching the users profile show a loading screen in light mode (Current limitations, you can't know the theme whilst fetching the profile)
	if (fetchProfileStatus === 'loading') {
		return <Loading isDark={false} />;
	}

	// Once the page isn't loading render the children contents (Should be the applications first routing stack)
	return <>{children}</>;
};

export default UserProfileProvider;
