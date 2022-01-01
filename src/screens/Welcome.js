// Core react dependencies
import * as React from 'react';

import Onboarding from 'react-native-onboarding-swiper';

// styled-components dependencies
import { useTheme } from 'styled-components';

// application components
import { Image } from '../components/core';

// application assets
import ShoppingList from '../../assets/ShoppingList.png';
import ShoppingListItemTracking from '../../assets/ItemTracking.png';
import Customize from '../../assets/Customise.png';
import Done from '../../assets/Done.png';

// Custom hooks
import { useUserProfile } from '../hooks';

const WelcomeScreen = () => {
	// Access the styled-components theme via their internal ThemeContext
	const { lightBlue } = useTheme();

	// Access the user profile user information stored in the UserContext Provider
	const { dispatch } = useUserProfile();

	return (
		<Onboarding
			onDone={() => {
				// 1. Dispatch the action to update the hasCompletedSetup state
				// 2. Since this state is used in App.js it should automatically redirect to the MainStack
				// NOTE: This will update AsyncStorage as well so upon reloading the app you should go straight to the MainStack.
				dispatch({ type: 'COMPLETE_SETUP' });
			}}
			skipToPage={3}
			transitionAnimationDuration={100}
			subTitleStyles={{ fontSize: 20 }}
			pages={[
				{
					backgroundColor: lightBlue,
					image: (
						<Image
							source={ShoppingList}
							width='200px'
							height='200px'
							accessibilityIgnoresInvertColors
						/>
					),
					title: 'Keep track of your items',
					subtitle:
						'You can maintain multiple shopping lists, you can have one for each store you visit'
				},
				{
					backgroundColor: lightBlue,
					image: (
						<Image
							source={ShoppingListItemTracking}
							width='200px'
							height='200px'
							accessibilityIgnoresInvertColors
						/>
					),
					title: 'Locate supermarkets',
					subtitle: 'Track your local supermarkets (Requires location permission)'
				},
				{
					backgroundColor: lightBlue,
					image: (
						<Image
							source={Customize}
							width='200px'
							height='200px'
							accessibilityIgnoresInvertColors
						/>
					),
					title: 'Day and night theme',
					subtitle: 'Switch between a day and night theme in the settings'
				},
				{
					backgroundColor: lightBlue,
					image: (
						<Image source={Done} width='200px' height='200px' accessibilityIgnoresInvertColors />
					),
					title: 'Are you ready ?',
					subtitle:
						'You have completed the tutorial, you can now start using the shopping list assistant'
				}
			]}
		/>
	);
};

export default WelcomeScreen;
