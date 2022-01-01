// Core react dependencies
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

// Expo dependencies
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// react-navigation dependencies
import { useFocusEffect } from '@react-navigation/native';

// location assets
import Locations from '../../assets/supermarkets.json';
import NightMode from '../../assets/GoogleMapsNight.json';

// application components
import { Loading } from '../components/screen-states';

// custom hooks
import { useUserProfile, useLocationPermission, useNotificationPermission } from '../hooks';

// Styled-Components can't provide this so a custom react-native view needed to be provided.
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

const locationReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_LOCATION': {
			return {
				...state,
				longitude: action.payload.longitude,
				latitude: action.payload.latitude
			};
		}

		default: {
			console.warn('locationReducer: unknown action fired');

			return { ...state };
		}
	}
};

const StoreTracker = () => {
	// Stores the users location related state
	const [{ longitude, latitude, longitudeDelta, latitudeDelta }, dispatch] = React.useReducer(
		locationReducer,
		{
			longitude: 0,
			latitude: 0,
			longitudeDelta: 0.009,
			latitudeDelta: 0.009
		}
	);

	const [isLoading, setIsLoading] = React.useState(true);
	const [isMapReady, setIsMapReady] = React.useState(false);

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { state: userProfileState } = useUserProfile();

	// Request location related permissions easily
	const { foregroundPermissionStatus } = useLocationPermission({
		enableForegroundPermission: true
	});

	// Handles the notification related functionality e.g. requesting access, checking the current status
	const { localNotificationsStatus, generateLocalNotification } = useNotificationPermission();

	// Watches the users location and updates
	// NOTE: This will perform on initial load of the screen and when it re-focuses
	useFocusEffect(
		React.useCallback(() => {
			const watchLocation = async () => {
				await Location.watchPositionAsync(
					{
						accuracy: Location.Accuracy.BestForNavigation
					},
					({ coords: { latitude: newLatitude, longitude: newLongitude } }) => {
						dispatch({
							type: 'UPDATE_LOCATION',
							payload: {
								latitude: newLatitude,
								longitude: newLongitude
							}
						});
					}
				);
			};

			// If the permission status is granted start watching the location
			if (foregroundPermissionStatus === 'granted') {
				// Start watching the position
				watchLocation();
			}
		}, [foregroundPermissionStatus])
	);

	// Whilst the users location is being watched check if they are near a shop
	// NOTE: This will perform on initial load of the screen and when it re-focuses
	useFocusEffect(
		React.useCallback(() => {
			const checkSupermarketLocations = () => {
				// Filtered data based on the lat and lng from watchPosition()
				// Prevents 5k markers being spawned on the map, which would actually crash it. The app stops responding :(
				const filteredCopyOfSuperMarkets = Locations.filter(
					(location) => latitude <= location.Lat && longitude <= location.Lng
				);

				// Check the supermarkets and users latitude and longitude
				// FLAW: Whilst the code runs and provides the necessary outputs it won't render the map when there are more than 190 marks.
				// SOLUTION: Add a clustering engine, allows the markers to gradually be spawned in. Unable to do it at the moment as Im short on time.
				filteredCopyOfSuperMarkets.map((data) => {
					if (latitude === data.Lat && longitude === data.Lng) {
						generateLocalNotification(
							{ vibrationEnabled: true, vibrationLength: 1000 },
							{
								title: 'Supermarket close by',
								body: `You are close to ${data.Store}, please check your shopping lists `
							}
						);
					}

					return data;
				});
			};

			// Only check the user is near a store if they have granted notification access
			if (localNotificationsStatus === 'granted') {
				checkSupermarketLocations();
			}
		}, [localNotificationsStatus, latitude, longitude, generateLocalNotification])
	);

	React.useEffect(() => {
		if (localNotificationsStatus !== '' && foregroundPermissionStatus !== '') {
			setIsLoading(false);
		}
	}, [localNotificationsStatus, foregroundPermissionStatus]);

	// While the page is loading, setting the latitude is false (0) or the longitude is false (0)
	if (isLoading === true) {
		return <Loading isDark={userProfileState.theme === 'dark'} />;
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={{
					longitude,
					latitude,
					longitudeDelta,
					latitudeDelta
				}}
				showsUserLocation
				zoomEnabled
				zoomTapEnabled
				rotateEnabled
				pitchEnabled
				followsUserLocation
				showsCompass
				customMapStyle={isMapReady === true && userProfileState.theme === 'dark' ? NightMode : []}
				provider={PROVIDER_GOOGLE}
				onMapReady={() => {
					setIsMapReady(true);
				}}
			/>
		</View>
	);
};

export default StoreTracker;
