import Onboarding from 'react-native-onboarding-swiper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Routing dependencies
import { useRouter } from 'expo-router';

// Application components
import { Image } from '../../src/components/core';

// Application assets
import ShoppingList from '../../assets/ShoppingList.png';
import ShoppingListItemTracking from '../../assets/ItemTracking.png';
import Customize from '../../assets/Customise.png';
import Done from '../../assets/Done.png';

// Application hooks
import { useUserProfile } from '../../src/hooks';

const WelcomeScreen = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { lightBlue } = useTheme();

	// Access the user profile user information stored in the UserContext Provider
	const { dispatch } = useUserProfile();

	return (
		<>
			<Onboarding
				onDone={() => {
					// Update the usrs profile, this marks the hasCompletedSetup boolean as true so when you come to the page next you go straight to the index page
					dispatch({ type: 'COMPLETE_SETUP' });

					// Redirect to the ShoppingLists tab
					router.push('(tabs)/ShoppingLists');
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
								width={200}
								height={200}
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
								width={200}
								height={200}
								accessibilityIgnoresInvertColors
							/>
						),
						title: 'Locate supermarkets',
						subtitle: 'Track your local supermarkets (Requires location permission)'
					},
					{
						backgroundColor: lightBlue,
						image: (
							<Image source={Customize} width={200} height={200} accessibilityIgnoresInvertColors />
						),
						title: 'Day and night theme',
						subtitle: 'Switch between a day and night theme in the settings'
					},
					{
						backgroundColor: lightBlue,
						image: (
							<Image source={Done} width={200} height={200} accessibilityIgnoresInvertColors />
						),
						title: 'Are you ready ?',
						subtitle:
							'You have completed the tutorial, you can now start using the shopping list assistant'
					}
				]}
			/>
		</>
	);
};

export default WelcomeScreen;