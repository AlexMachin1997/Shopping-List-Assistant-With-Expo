import * as React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as AsyncStorage from 'expo-secure-store';

const useProfile = ({ onSuccess = null, onError = null } = {}) => {
	// Access the queryClient from the QueryClientProvider component, useful for invalidating and update the cache
	const queryClient = useQueryClient();

	// Store the queryKey for the query
	const queryKey = React.useMemo(() => [{ key: 'user-profile', dependencies: null }], []);

	// Handles the fetching of the user profile
	const query = useQuery({
		queryKey,
		queryFn: async () => {
			// The profile object (Contains the default values e.g. theme 'light')
			let profileObject = {
				theme: 'light',
				hasCompletedSetup: false
			};

			// Attempt to decrypt the users persisted profile (Can throw an error or return the value in string format)
			try {
				// Attempt to retrieve the profile
				const profileFromAsyncStorage = await AsyncStorage.getItemAsync(queryKey[0].key);

				// Either override the project object with the retrieved values or save the default values
				if (profileFromAsyncStorage !== null) {
					// Parse the string returned from the expo Secure Store to access the objects properties
					const parsedProfileFromAsyncStorage = JSON.parse(profileFromAsyncStorage);

					// Override the default values with the new values as the user has successfully retrieved the profile
					profileObject = {
						...profileObject,
						theme: parsedProfileFromAsyncStorage.theme ?? profileObject.theme,
						hasCompletedSetup: true
					};
				}

				// Return the data to access it in the queries data
				return Promise.resolve(profileObject);
			} catch (error) {
				return Promise.reject(new Error(error.message));
			}
		},
		keepPreviousData: true,
		retry: 2
	});

	// Handles the update of the user profile
	const mutation = useMutation({
		mutationFn: async (variables) => {
			try {
				if (variables === null) {
					throw Error('There must be variables present in the mutation payload');
				}

				// Get the current query data via the queryClient
				const profile = queryClient.getQueryData(queryKey, { type: 'active' });

				const newProfile = { ...profile, ...(variables?.payload ?? {}) };

				// Attempt to override the current profile data (combines the current active query and )
				await AsyncStorage.setItemAsync(queryKey[0].key, JSON.stringify(newProfile));

				return newProfile;
			} catch (error) {
				return Promise.reject(new Error(error.message));
			}
		},
		onMutate: async (variables) => {
			// Cancel any queries for the profile
			await queryClient.cancelQueries({ queryKey });

			// Store references to the current profile and old profile object (Used for rolling forward or backwards)
			let profile = queryClient.getQueryData(queryKey, { type: 'active' });
			const previousProfile = queryClient.getQueryData(queryKey, { type: 'active' });

			// Map the data based on the type of event being performed
			switch (variables?.type ?? '') {
				case 'THEME_CHANGE': {
					profile = {
						...profile,
						theme: variables?.payload?.theme ?? 'light'
					};

					break;
				}

				case 'COMPLETE_ONBOARDING': {
					profile = {
						...profile,
						hasCompletedSetup: true
					};

					break;
				}

				case 'RESET_PROFILE': {
					profile = {
						theme: 'light',
						hasCompletedSetup: false
					};

					break;
				}

				default: {
					profile = {
						...profile
					};
				}
			}

			// Update the query key data with the new profile object (Certain properties are updated above)
			queryClient.setQueryData(queryKey, () => ({ ...(profile ?? {}) }));

			// After the mutation function has been complete pass some data to the context
			return { newProfile: profile, oldProfile: previousProfile };
		},
		onSuccess: (data, variables, context) => {
			// Update the current active queries data with the old data
			// NOTE: A delay is added to prevent the transition being too quick
			setTimeout(() => {
				queryClient.setQueryData(queryKey, () => ({ ...data }));
			}, 1000);

			// If there is an onSuccess callback provided pass back any necessary data ie everything the mutation exposes
			if (onSuccess !== null) {
				onSuccess({ data, variables, context });
			}
		},
		onError: async (error, variables, context) => {
			// Update the current active queries data with the old data
			// NOTE: A delay is added to prevent the transition being too quick
			setTimeout(() => {
				queryClient.setQueryData(queryKey, () => ({ ...JSON.parse(context.oldProfile) }));
			}, 1000);

			// If there is an onError callback provided pass back any necessary data ie everything the mutation exposes
			if (onError !== null) {
				onError({ data: error, variables, context });
			}
		}
	});

	return {
		// Query related status
		profile: query?.data ?? null,
		fetchProfileStatus: query.status,

		// Mutation related state
		mutate: mutation.mutate,
		updateProfileStatus: mutation.status
	};
};

export default useProfile;
