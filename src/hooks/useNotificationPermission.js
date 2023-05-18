import * as React from 'react';
import { Platform, Vibration } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// More information about setNotificationHandle here https://docs.expo.dev/push-notifications/overview/#usage
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

const useNotificationPermission = () => {
	const [localNotificationsStatus, setLocalNotificationsStatus] = React.useState('');
	const [, setExpoPushNotificationToken] = React.useState('');

	const notificationListener = React.useRef();
	const responseListener = React.useRef();

	// https://www.coursera.org/lecture/react-native/exercise-video-local-notifications-Aoo3t
	const generateLocalNotification = React.useCallback(async (config, payload) => {
		// Provide config to customize the location notification e.g. vibration, message etc
		const { vibrationEnabled = true, vibrationLength = 1000 } = config;

		// If the vibration is enabled use React-Natives Vibration api
		if (vibrationEnabled === true) {
			Vibration.vibrate(vibrationLength);
		}

		// Create the notification
		await Notifications.scheduleNotificationAsync({
			content: {
				...payload
			}
		});
	}, []);

	// Handles the notification functionality
	React.useEffect(() => {
		const registerForPushNotificationsAsync = async () => {
			try {
				// With the latest version of expo-notifications you need to call setNotificationChannelAsync to get a token
				// https://docs.expo.dev/versions/latest/sdk/notifications/#android-1
				if (Platform.OS === 'android') {
					const androidChannelResponse = await Notifications.setNotificationChannelAsync(
						'default',
						{
							name: 'default',
							importance: Notifications.AndroidImportance.MAX,
							vibrationPattern: [0, 250, 250, 250],
							lightColor: '#FF231F7C'
						}
					);

					if (androidChannelResponse === null) {
						throw Error("This Android device doesn't support push notifications");
					}
				}

				// Push notifications will only work on physical devices ie anything but a simulator
				if (Device.isDevice === false) {
					throw Error('To be able to use local push notifications you need a physical device');
				}

				// Get the current notification permissions
				const { status: existingStatus } = await Notifications.getPermissionsAsync();

				// If the users current permission isn't granted request permission
				if (existingStatus !== 'granted') {
					const { status } = await Notifications.requestPermissionsAsync();
					setLocalNotificationsStatus(status);
				} else {
					setLocalNotificationsStatus(existingStatus);
				}

				// Not sure why this is needed.....
				const requestedToken = await Notifications.getExpoPushTokenAsync({
					projectId: Constants.manifest.projectId
				}).data;

				setExpoPushNotificationToken(requestedToken);
			} catch (err) {
				// Log the error to the console for better debugging
				console.error('useNotificationPermission error', err?.message ?? '');

				// Whenever we fail to get the users permission just set it to denied internally to stop any loaders or trigger any events
				setLocalNotificationsStatus('denied');
			}
		};

		registerForPushNotificationsAsync();
	}, []);

	React.useEffect(() => {
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			console.log(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return {
		localNotificationsStatus,
		generateLocalNotification
	};
};

export default useNotificationPermission;
