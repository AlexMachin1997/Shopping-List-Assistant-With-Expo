// Core react dependencies
import * as React from 'react';
import PropTypes from 'prop-types';

// Routing dependencies
import { useRouter } from 'expo-router';

import { getItem, setItem } from '../utils/AsyncStorage';
import { Loading } from '../components/screen-states';

export const UserProfileContext = React.createContext();

const DEFAULT_STATE = {
	theme: 'light',
	hasCompletedSetup: false,
	isRestoringProfile: true
};

const UserProfileReducer = (state, action) => {
	switch (action.type) {
		case 'RESTORE': {
			return {
				...action.payload,
				isRestoringProfile: false
			};
		}

		case 'SET_USER_THEME': {
			return {
				...state,
				theme: action.payload.theme
			};
		}

		case 'COMPLETE_SETUP': {
			return {
				...state,
				hasCompletedSetup: true
			};
		}

		case 'RESET_PROFILE':
		case 'SETUP_PROFILE': {
			return {
				...DEFAULT_STATE,
				isRestoringProfile: false
			};
		}

		default: {
			console.warn('UserProfileReducer: unknown action fired');

			return {
				...state,
				isRestoringProfile: false
			};
		}
	}
};

export const UserProfileProvider = ({ children }) => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// User profile reducer
	const [state, dispatch] = React.useReducer(UserProfileReducer, DEFAULT_STATE);

	// A ref to track if actions can be dispatched safely
	const hasMounted = React.useRef(false);
	const hasPerformedInitialRedirect = React.useRef(false);

	// Used to safely dispatch actions
	const safeDispatch = React.useCallback((...args) => {
		if (hasMounted.current === true) {
			dispatch(...args);
		}
	}, []);

	// Handle the hasMounted reference
	React.useEffect(() => {
		hasMounted.current = true;

		return () => {
			hasMounted.current = false;
		};
	}, []);

	// Get up or setup the basic state
	React.useEffect(() => {
		const getUserProfile = async () => {
			// Attempt to retrieve the profile from storage
			const response = await getItem('profile');

			// No profile found, perform initial setup otherwise use the value from storage
			if (response === null) {
				safeDispatch({ type: 'SETUP_PROFILE' });
			} else {
				safeDispatch({ type: 'RESTORE', payload: response });
			}
		};

		getUserProfile();
	}, [safeDispatch]);

	React.useEffect(() => {
		// When the user hasn't already been redirect and the profile isn't being fetched
		if (hasPerformedInitialRedirect.current === false && state.isRestoringProfile === false) {
			// When the user has completed the setup then redirect them to the starting page
			if (state.hasCompletedSetup === true) {
				// Set hasPerformedInitialRedirect to true to avoid re-running effect
				hasPerformedInitialRedirect.current = true;

				// Redirect the user to the shopping list tab
				router.replace('/(tabs)/ShoppingLists');
			}

			if (state.hasCompletedSetup === false) {
				// Set hasPerformedInitialRedirect to true to avoid re-running effect
				hasPerformedInitialRedirect.current = true;

				// Redirect the user to the on boarding page (Welcome page)
				router.replace('/(auth)/Onboarding');
			}
		}
	}, [router, state.hasCompletedSetup, state.isRestoringProfile]);

	// Store the state in Async-Storage
	React.useEffect(() => {
		const saveStateToAsyncStorage = async () => {
			await setItem('profile', state);
		};

		if (state.isRestoringProfile === false) {
			saveStateToAsyncStorage();
		}
	}, [state]);

	const value = React.useMemo(
		() => ({
			state,
			dispatch: safeDispatch
		}),
		[state, safeDispatch]
	);

	return (
		<UserProfileContext.Provider value={value}>
			{state.isRestoringProfile ? <Loading isDark={state.theme === 'dark'} /> : children}
		</UserProfileContext.Provider>
	);
};

UserProfileProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.func]).isRequired
};
