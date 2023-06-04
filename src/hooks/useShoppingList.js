// Core react dependencies
import * as React from 'react';

// Expo modules
import * as AsyncStorage from 'expo-secure-store';

// TanStack query modules
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useShoppingList = ({
	// Callback to handle various mutation events, can be leveraged to perform additional events
	onSuccess = null,
	onError = null,
	onSettled = null,

	// The shopping list id you want to view and update, this should be the id for the shopping list
	shoppingListId = null,

	// Used to disable the query e.g. if the shopping lists is being fetched don't fetch the shopping list
	isQueryEnabled = true,

	// Gives us access to the shopping lists query key e.g. for invalidating the list when we update the shopping list
	shoppingListsQueryKey = []
} = {}) => {
	// Access the queryClient from the QueryClientProvider component, useful for invalidating and update the cache
	const queryClient = useQueryClient();

	// Store the queryKey for the query
	const queryKey = React.useMemo(
		() => [{ key: 'shopping-lists', dependencies: { id: shoppingListId } }],
		[shoppingListId]
	);

	const query = useQuery({
		queryKey,
		queryFn: async () => {
			try {
				// Perform a fresh lookup of the "shopping lists" query data (Fetched via the client hook)
				const shoppingLists = queryClient.getQueryData(shoppingListsQueryKey);

				// Attempt to find the current shopping list from the current shopping lists query data
				const shoppingListItem = shoppingLists.find((el) => el.id === shoppingListId);

				// If the item can't be found then throw an error
				if (shoppingListItem === undefined) {
					throw Error('Unable to find shopping list you requested');
				}

				// If the item is found add it to the cache
				return shoppingListItem;
			} catch (error) {
				return Promise.reject(new Error(error.message));
			}
		},
		enabled: isQueryEnabled,
		keepPreviousData: true
	});

	const mutation = useMutation({
		mutationFn: async (variables) => {
			try {
				// Attempt to update the Shopping Lists data in expo-secure-store
				await AsyncStorage.setItemAsync(
					variables?.payload?.shoppingListsQueryKey[0].key ?? '',
					JSON.stringify(variables?.payload?.shoppingLists ?? [])
				);

				// Return the data so certain callbacks can access it e.g. onSuccess
				return Promise.resolve(variables?.payload?.shoppingLists ?? []);
			} catch (error) {
				return Promise.reject(new Error(error.message));
			}
		},
		onMutate: async (variables) => {
			// Cancel any queries for the "Shopping List" query
			await queryClient.cancelQueries({ queryKey });

			// Cancel any queries for the "Shopping Lists" query
			await queryClient.cancelQueries({
				queryKey: variables?.payload?.shoppingListsQueryKey ?? []
			});

			// Store a reference to the old set of "Shopping Lists" query entry
			const previousShoppingLists = queryClient.getQueryData(
				variables?.payload?.shoppingListsQueryKey ?? []
			);

			// Store a reference to the old set of "Shopping List" query entry
			const previousShoppingList = queryClient.getQueryData(queryKey);

			// Update the current "Shopping Lists" query entry with the new incoming "Shopping Lists" data
			queryClient.setQueryData(
				variables?.payload?.shoppingListsQueryKey ?? [],
				variables?.payload?.shoppingLists ?? []
			);

			// Update the current "Shopping List" with the new incoming "Shopping List" data
			queryClient.setQueryData(queryKey, variables?.payload?.shoppingList ?? []);

			// Provide any necessary context values so callbacks that have access to the context can access the data needed to perform various actions
			return {
				oldShoppingLists: previousShoppingLists ?? [],
				oldShoppingList: previousShoppingList ?? null,

				newShoppingLists: variables?.payload?.shoppingLists ?? [],
				newShoppingList: variables?.payload?.shoppingList ?? []
			};
		},
		onSuccess: (data, variables, context) => {
			// When the onSuccess callback is provided pass back all the variables
			if (onSuccess) {
				onSuccess({ data, variables, context });
			}
		},
		onError: (error, variables, context) => {
			// Rollback the current "shopping lists" cache to the old "shopping lists"
			queryClient.setQueryData(
				variables?.payload?.shoppingListsQueryKey ?? [],
				context?.oldShoppingLists ?? []
			);

			// Rollback the current "shopping list" cache to the old "shopping list"
			queryClient.setQueryData(queryKey, context?.oldShoppingList ?? []);

			// When the onError callback is provided pass back all the variables
			if (onError) {
				onError({ error, variables, context });
			}
		},
		onSettled: async (data, error, variables, context) => {
			// Invalidate the "shopping lists" cache
			await queryClient.invalidateQueries({
				queryKey: variables?.payload?.shoppingListsQueryKey ?? [],
				exact: true
			});

			// Invalidate the "Shopping List" query
			await queryClient.invalidateQueries({ queryKey });

			// When the onSettled callback is provided pass back all the variables
			if (onSettled) {
				onSettled({ error, data, variables, context });
			}
		}
	});

	return {
		// Query related state and actions
		shoppingList: query?.data ?? null,
		shoppingListFetchStatus: query.status,
		isIdle: query.fetchStatus === 'idle',
		refetch: query.refetch,

		// Mutation related state and actions
		mutate: mutation.mutate,
		shoppingListMutateStatus: mutation.status,

		queryKey
	};
};

export default useShoppingList;
