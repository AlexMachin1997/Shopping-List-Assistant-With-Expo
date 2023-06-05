import * as React from 'react';
import { useFocusEffect } from 'expo-router';

const useRefreshOnFocus = (refetch) => {
	const firstTimeRef = React.useRef(true);

	useFocusEffect(
		React.useCallback(() => {
			if (firstTimeRef.current) {
				firstTimeRef.current = false;
				return;
			}

			refetch();
		}, [refetch])
	);
};

export default useRefreshOnFocus;
