// Core react dependencies
import * as React from 'react';

// Expo modules
import * as AsyncStorage from 'expo-secure-store';

// TanStack query dependencies
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const useShoppingLists = ({ onSuccess = null, onError = null, onSettled = null } = {}) => {
	// Access the queryClient from the QueryClientProvider component, useful for invalidating and update the cache
	const queryClient = useQueryClient();

	// Store the queryKey for the query
	const queryKey = React.useMemo(() => [{ key: 'shopping-lists', dependencies: null }], []);

	// Handles fetching of the shopping lists
	const query = useQuery({
		queryKey,
		queryFn: async () => {
			// Attempt to decrypt the users persisted shopping lists (Can throw an error or return the value in string format)
			try {
				// Attempt to retrieve the shopping lists
				const shoppingListsFromAsyncStorage = await AsyncStorage.getItemAsync(queryKey[0].key);

				// Defaults to empty array (It'll be this when there is an error or if there)
				let shoppingLists = [];

				// If there is a shopping list in storage
				if (shoppingListsFromAsyncStorage !== null) {
					shoppingLists = JSON.parse(shoppingListsFromAsyncStorage);
				}

				// Return the data to access it in the queries data
				return Promise.resolve(shoppingLists);
			} catch (error) {
				return Promise.reject(new Error(error.message));
			}
		}
	});

	// Handles the update the of shopping lists
	const mutation = useMutation({
		mutationFn: async (variables) => {
			try {
				// Attempt to override the current shopping list (combines the current active query and )
				await AsyncStorage.setItemAsync(
					queryKey[0].key,
					JSON.stringify(variables?.payload?.shoppingLists ?? [])
				);

				// Return the data so certain callbacks can access it e.g. onSuccess
				return Promise.resolve(variables?.payload?.shoppingLists ?? []);
			} catch (error) {
				return Promise.reject(new Error(error.message));
			}
		},
		onMutate: async (variables) => {
			// Cancel any queries for the "Shopping Lists" query
			await queryClient.cancelQueries({ queryKey });

			// Store a reference to the old set of "Shopping Lists" query entry
			const previousShoppingLists = queryClient.getQueryData(queryKey);

			// Update the current "Shopping Lists" query entry with the new incoming "Shopping Lists" data
			queryClient.setQueryData(queryKey, () => variables?.payload?.shoppingLists ?? []);

			// Provide any necessary context values so callbacks that have access to the context can access the data needed to perform various actions
			return {
				oldShoppingLists: previousShoppingLists
			};
		},
		onSuccess: (data, variables, context) => {
			// When the onSuccess callback is provided pass back all the variables
			if (onSuccess) {
				onSuccess({ data, variables, context });
			}
		},
		onError: (error, variables, context) => {
			// Update the current active queries data with the old data
			queryClient.setQueryData(queryKey, context?.oldShoppingLists ?? []);

			// When the onError callback is provided pass back all the variables
			if (onError) {
				onError({ error, variables, context });
			}
		},
		onSettled: (data, error, variables, context) => {
			// Every time the mutation finishes (Success or failure) invalidate cache entries and refetch them
			queryClient.invalidateQueries({ queryKey });

			// When the onSettled callback is provided pass back all the variables
			if (onSettled) {
				onSettled({ error, data, variables, context });
			}
		}
	});

	return {
		// Query related state and actions
		shoppingLists: query?.data ?? null,
		shoppingListsFetchStatus: query.status,
		refetch: query.refetch,
		isRefetching: query.isRefetching,

		// Mutation related state and actions
		mutate: mutation.mutate,
		shoppingListsMutationStatus: mutation.status,

		queryKey
	};
};

export default useShoppingLists;
