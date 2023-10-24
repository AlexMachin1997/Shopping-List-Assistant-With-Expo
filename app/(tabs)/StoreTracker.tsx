// Core react dependencies
import * as React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

// Expo dependencies
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// Routing dependencies
import { useFocusEffect } from 'expo-router';

// Map component data
import { useTheme } from 'styled-components';
import Locations from '../../assets/supermarkets.json';
import NightMode from '../../assets/GoogleMapsNight.json';

// Application assets
import ItemTrackingImage from '../../assets/ItemTracking.png';

// Application components
import { EmptyOrError, Loading } from '../../src/components/screen-states';

// Application hooks
import { useNotification, useProfile, usePullRefetch } from '../../src/hooks';
import { ProfileTheme } from '../../types/Profile';

// Styled-Components can't provide this so a custom react-native view needed to be provided.
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

const StoreTracker = () => {
	// Used to keep track of the Expo location watching function
	const watchPositionAsyncRef = React.useRef<Location.LocationSubscription>();

	// Stores the users location related state
	const [locationState, setLocationState] = React.useState({
		longitude: 0,
		latitude: 0,
		longitudeDelta: 0.009,
		latitudeDelta: 0.009
	});

	// Loading states for various UI elements
	const [isLoading, setIsLoading] = React.useState(true);
	const [isMapReady, setIsMapReady] = React.useState(false);
	const [hasLocationEnabled, setHasLocationEnabled] = React.useState(false);

	// Access any application wide settings (Only supports dark.light mode at the minute)
	const { profile } = useProfile();

	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	// Get's or requests the current permission/s related to the locations foreground functionality
	const [foregroundPermissionStatus] = Location.useForegroundPermissions({
		request: true,
		get: true
	});

	// Handles the notification related functionality e.g. requesting access, checking the current status
	const { localNotificationsStatus, generateLocalNotification } = useNotification();

	//
	const { handleRefetch, isRefreshing } = usePullRefetch(async () => {
		const result = await Location.hasServicesEnabledAsync();
		setHasLocationEnabled(result);
	});

	// When the screen focusses check to see if the user locations is enabled, this is an effect as well the api is async
	useFocusEffect(
		React.useCallback(() => {
			const hasLocationServicesEnabled = async () => {
				const result = await Location.hasServicesEnabledAsync();
				setHasLocationEnabled(result);
			};

			hasLocationServicesEnabled();
		}, [])
	);

	// A little effect which runs when the screen un-focuses, the next time the user visits this tab without location the location won't be requested
	useFocusEffect(React.useCallback(() => () => setHasLocationEnabled(false), []));

	// Watches the users location and updates
	// NOTE: This will perform on initial load of the screen and when it re-focuses
	useFocusEffect(
		React.useCallback(() => {
			const watchLocation = async () => {
				// Start watching the users position whilst in the foreground (Store the ref for cleanup)
				watchPositionAsyncRef.current = await Location.watchPositionAsync(
					{
						// Was Best for Navigation, but that seems rather unnecessary and aggressive.
						accuracy: Location.Accuracy.Balanced
					},
					({ coords: { latitude, longitude } }) => {
						setLocationState((prevState) => ({
							...prevState,
							longitude,
							latitude
						}));
					}
				);
			};

			// Only start listening for the location when the user has granted foreground permission
			if ((foregroundPermissionStatus?.granted ?? false) && hasLocationEnabled === true) {
				watchLocation();
			}

			// Cleanup the watchPositionAsync when the screen unmounts (Stopped listening for the users location)
			return () => watchPositionAsyncRef?.current?.remove() ?? null;
		}, [foregroundPermissionStatus?.granted, hasLocationEnabled])
	);

	// Whilst the users location is being watched check if they are near a shop
	// NOTE: This will perform on initial load of the screen and when it re-focuses
	useFocusEffect(
		React.useCallback(() => {
			const checkSupermarketLocations = () => {
				// Filtered data based on the lat and lng from watchPosition()
				// Prevents 5k markers being spawned on the map, which would actually crash it. The app stops responding :(
				const filteredCopyOfSuperMarkets = Locations.filter(
					(location) =>
						locationState.latitude <= location.Lat && locationState.longitude <= location.Lng
				);

				// Check the supermarkets and users latitude and longitude
				// FLAW: Whilst the code runs and provides the necessary outputs it won't render the map when there are more than 190 marks.
				// SOLUTION: Add a clustering engine, allows the markers to gradually be spawned in. Unable to do it at the moment as Im short on time.
				filteredCopyOfSuperMarkets.forEach((data) => {
					if (locationState.latitude === data.Lat && locationState.longitude === data.Lng) {
						generateLocalNotification(
							{ vibrationEnabled: true, vibrationLength: 1000 },
							{
								title: 'Supermarket close by',
								body: `You are close to ${data.Store}, please check your shopping lists `
							}
						);
					}
				});
			};

			// Only check the user is near a store if they have granted notification access
			if (localNotificationsStatus === 'granted') {
				checkSupermarketLocations();
			}
		}, [
			localNotificationsStatus,
			locationState.latitude,
			locationState.longitude,
			generateLocalNotification
		])
	);

	React.useEffect(() => {
		if (localNotificationsStatus !== '' && foregroundPermissionStatus !== null) {
			setIsLoading(false);
		}
	}, [localNotificationsStatus, foregroundPermissionStatus]);

	// While the page is loading, setting the latitude is false (0) or the longitude is false (0)
	if (isLoading === true) {
		return <Loading isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK} />;
	}

	// After the screen has loaded if the location services aren't enabled....
	if (hasLocationEnabled === false) {
		return (
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor:
						(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? darkBlue : lightBlue
				}}
				refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefetch} />}
			>
				<EmptyOrError
					isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
					image={ItemTrackingImage}
					heading='Location tracking error'
					overview="Location services aren't enabled, please enable them to view the map"
				/>
			</ScrollView>
		);
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={locationState}
				showsUserLocation
				zoomEnabled
				zoomTapEnabled
				rotateEnabled
				pitchEnabled
				followsUserLocation
				showsCompass
				customMapStyle={
					isMapReady === true && (profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK
						? NightMode
						: []
				}
				provider={PROVIDER_GOOGLE}
				onMapReady={() => {
					setIsMapReady(true);
				}}
			/>
		</View>
	);
};

export default StoreTracker;
