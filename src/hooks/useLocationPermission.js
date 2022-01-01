import * as React from 'react';

import * as Location from 'expo-location';

const useLocationPermission = (config) => {
	const { enableForegroundPermission = true } = config;

	const [foregroundPermissionStatus, setForegroundPermissionStatus] = React.useState('');

	// Handles the foreground location functionality
	React.useEffect(() => {
		const getPermissions = async () => {
			// Get the current status of the users foreground location
			const { status: existingStatus } = await Location.getForegroundPermissionsAsync();

			// If the existing permission isn't granted re-request the permission
			if (existingStatus !== 'granted') {
				// Get the status for the request
				const { status } = await Location.requestForegroundPermissionsAsync();

				// Update the foreground status on the UI, will be used to show or hide various features
				setForegroundPermissionStatus(status);
			} else {
				// If the user has already set there permission just use that status
				setForegroundPermissionStatus(existingStatus);
			}
		};

		// If you have requested to use the foreground permission get and/or set the foreground permissions
		// NOTE: If background locations are required get the foreground permission before getting the background permission -> https://docs.expo.dev/versions/latest/sdk/location/#locationrequestbackgroundpermissionsasync
		if (enableForegroundPermission === true) {
			getPermissions();
		}
	}, [enableForegroundPermission]);

	return {
		foregroundPermissionStatus
	};
};

export default useLocationPermission;
