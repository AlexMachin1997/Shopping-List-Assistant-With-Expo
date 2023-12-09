/* eslint-disable no-unused-vars */
// Core react dependencies
import * as React from 'react';

// TanStack query dependencies
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Expo modules
import * as AsyncStorage from 'expo-secure-store';
import getErrorMessage from '@/utils/getErrorMessage';
import { Profile, ProfileTheme } from '../types/Profile';

type ProfileMutationVariables =
	| { type: 'COMPLETE_ONBOARDING'; payload: { profile: Profile } }
	| { type: 'THEME_CHANGE'; payload: { profile: Profile } }
	| { type: 'RETAKE_ONBOARDING'; payload: { profile: Profile } };

type UseProfileCallbacks = {
	data?: Profile;
	variables: ProfileMutationVariables;
	context?: { newProfile: Profile; oldProfile: Profile };
	error?: unknown;
};

const DEFAULT_PROFILE = {
	hasCompletedSetup: false,
	theme: ProfileTheme.LIGHT
};

const useProfile = ({
	onSuccess = null,
	onError = null,
	onSettled = null
}: Partial<{
	onSuccess?: null | ((data: UseProfileCallbacks) => void);
	onError?: null | ((data: UseProfileCallbacks) => void);
	onSettled?: null | ((data: UseProfileCallbacks) => void);
}> = {}) => {
	// Access the queryClient from the QueryClientProvider component, useful for invalidating and update the cache
	const queryClient = useQueryClient();

	// Store the queryKey for the query
	const queryKey = React.useMemo(() => [{ key: 'user-profile', dependencies: null }], []);

	// Handles the fetching of the user profile
	const query = useQuery<Profile>({
		queryKey,
		queryFn: async () => {
			// The profile object (Contains the default values e.g. theme 'light')
			let profileObject = DEFAULT_PROFILE;

			// Attempt to decrypt the users persisted profile (Can throw an error or return the value in string format)
			try {
				// Attempt to retrieve the profile
				const profileFromAsyncStorage = await AsyncStorage.getItemAsync(queryKey[0].key);

				// Either override the project object with the retrieved values or save the default values
				if (profileFromAsyncStorage !== null) {
					// Parse the string returned from the expo Secure Store to access the objects properties
					const parsedProfileFromAsyncStorage = JSON.parse(profileFromAsyncStorage) as Profile;

					// Override the default values with the new values as the user has successfully retrieved the profile
					profileObject = {
						...profileObject,
						theme: parsedProfileFromAsyncStorage?.theme ?? profileObject.theme,
						hasCompletedSetup: parsedProfileFromAsyncStorage?.hasCompletedSetup ?? false
					};
				}

				// Return the data to access it in the queries data
				return Promise.resolve(profileObject);
			} catch (error: unknown) {
				// Log the error to the console for better debugging
				console.error('Something went wrong fetching the users profile', getErrorMessage(error));

				// Log the error to the console for better debugging
				return Promise.reject(new Error(getErrorMessage(error)));
			}
		}
	});

	// Handles the update of the user profile
	const mutation = useMutation({
		mutationFn: async (variables: ProfileMutationVariables) => {
			try {
				// Store a reference to the old set of data
				const previousProfile = queryClient.getQueryData<Profile>(queryKey) ?? DEFAULT_PROFILE;

				// Store a reference to the "expected" cache data (The shape must match exactly)
				const incomingProfile = {
					...previousProfile,
					...(variables?.payload?.profile ?? '')
				};

				// Attempt to override the current profile data (combines the current active query and )
				await AsyncStorage.setItemAsync(queryKey[0].key, JSON.stringify(incomingProfile));

				// Return the new profile so it can be accessed in some of the callbacks e.g. onSuccess
				return incomingProfile;
			} catch (error) {
				// Log the error to the console for better debugging
				console.error('Something went wrong updating the users profile', getErrorMessage(error));

				// Log the error to the console for better debugging
				return Promise.reject(new Error(getErrorMessage(error)));
			}
		},
		onMutate: async (variables: ProfileMutationVariables) => {
			// Cancel any queries for the profile
			await queryClient.cancelQueries({ queryKey, type: 'all' });

			// Store a reference to the "expected" cache data (The shape must match exactly)
			const incomingProfile = variables.payload.profile;

			// Store a reference to the old set of data
			const previousProfile = queryClient?.getQueryData<Profile>(queryKey) ?? DEFAULT_PROFILE;

			// Update the query key data with the new profile object (Certain properties are updated above)
			queryClient.setQueryData(queryKey, incomingProfile);

			// After the mutation function has been complete pass some data to the context
			return { newProfile: incomingProfile, oldProfile: previousProfile };
		},
		onSuccess: (data, variables, context) => {
			// If there is an onSuccess callback provided pass back any necessary data ie everything the mutation exposes
			if (typeof onSuccess === 'function') {
				onSuccess({ data, variables, context });
			}
		},
		onError: async (error, variables, context) => {
			// Update the current active queries data with the old data
			// NOTE: A delay is added to prevent the transition being too quick
			if (context !== undefined) {
				setTimeout(() => {
					queryClient.setQueryData(queryKey, context.oldProfile);
				}, 1000);
			}

			// If there is an onError callback provided pass back any necessary data ie everything the mutation exposes
			if (onError !== null) {
				onError({ error, data: null, variables, context });
			}
		},
		onSettled: async (data, error, variables, context) => {
			// Invalidate the "shopping list" cache
			await queryClient.invalidateQueries({ queryKey });

			// When the onSettled callback is provided pass back all the variables
			if (onSettled) {
				onSettled({ error, data, variables, context });
			}
		}
	});

	return {
		// Query related state and actions
		profile: query?.data ?? DEFAULT_PROFILE,
		fetchProfileStatus: query.status,
		refetch: query.refetch,

		// Mutation related state
		mutate: mutation.mutate,
		updateProfileStatus: mutation.status
	};
};

export default useProfile;
