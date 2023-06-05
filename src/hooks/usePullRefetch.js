import * as React from 'react';

const usePullRefetch = (refetch) => {
	const [isRefreshing, setIsRefreshing] = React.useState(false);

	async function handleRefetch() {
		setIsRefreshing(true);

		try {
			await refetch();
		} finally {
			setIsRefreshing(false);
		}
	}

	return {
		isRefreshing,
		handleRefetch
	};
};

export default usePullRefetch;
