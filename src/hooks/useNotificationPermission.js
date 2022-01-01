import * as React from 'react';
import { Platform, Vibration } from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

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
	// eslint-disable-next-line no-unused-vars
	const [expoPushNotificationToken, setExpoPushNotificationToken] = React.useState('');

	const notificationListener = React.useRef();
	const responseListener = React.useRef();

	// https://www.coursera.org/lecture/react-native/exercise-video-local-notifications-Aoo3t
	const generateLocalNotification = React.useCallback((config, payload) => {
		// Provide config to customize the location notification e.g. vibration, message etc
		const { vibrationEnabled = true, vibrationLength = 1000 } = config;

		// If the vibration is enabled use React-Natives Vibration api
		if (vibrationEnabled === true) {
			Vibration.vibrate(vibrationLength);
		}

		// Create the notification
		Notifications.scheduleNotificationAsync({
			content: {
				...payload
			}
		});
	}, []);

	// Handles the notification functionality
	React.useEffect(() => {
		const registerForPushNotificationsAsync = async () => {
			// Check if the device being used is a device, you can't have notifications functionality if it's not an actual device. Notifications don't work in a simulator.
			if (Constants.isDevice) {
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
				const requestedToken = await Notifications.getExpoPushTokenAsync().data;
				setExpoPushNotificationToken(requestedToken);
			} else {
				console.warn('Must use physical device for Push Notifications');
			}

			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231F7C'
				});
			}
		};

		registerForPushNotificationsAsync();
	}, []);

	// Prints out notifications
	React.useEffect(() => {
		if (localNotificationsStatus === 'granted') {
			notificationListener.current = Notifications.addNotificationReceivedListener(
				(notification) => {
					console.log(notification);
				}
			);

			responseListener.current = Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);

			return () => {
				Notifications.removeNotificationSubscription(notificationListener.current);
				Notifications.removeNotificationSubscription(responseListener.current);
			};
		}
	}, [localNotificationsStatus]);

	return {
		localNotificationsStatus,
		generateLocalNotification
	};
};

export default useNotificationPermission;
