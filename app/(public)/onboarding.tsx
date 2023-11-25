import ReactNativeOnboardingSwipper from 'react-native-onboarding-swiper';
import { useTheme } from 'styled-components';
import { useRouter } from 'expo-router';

import ProfileService from '@/services/ProfileService';
import { Image, Section } from '@/components/core';

// Application assets
import { useProfile } from '@/hooks';
import { ProfileTheme } from '@/types/Profile';
import ShoppingList from '../../assets/ShoppingList.png';
import ShoppingListItemTracking from '../../assets/ItemTracking.png';
import Customize from '../../assets/Customise.png';
import Done from '../../assets/Done.png';

const Onboarding = () => {
	// Access the expo-router internals e.g navigating imperatively via .push(), .replace() etc
	const router = useRouter();

	// Access the styled-components theme via their internal ThemeContext
	const { lightBlue, darkBlue } = useTheme();

	// Access the user profile user information stored in the UserContext Provider
	const { mutate, profile } = useProfile({
		onSuccess: () => {
			// Manually navigate to shopping lists tab screen, this isn't done automatically as we can't redirect in the root layout.
			router.replace('/(private)/(tabs)/ShoppingLists');
		}
	});

	const sectionBackground = profile.theme === ProfileTheme.DARK ? darkBlue : lightBlue;

	return (
		<ReactNativeOnboardingSwipper
			onDone={() => {
				// Complete the onboarding process for the current user
				mutate({
					type: 'COMPLETE_ONBOARDING',
					payload: {
						profile: ProfileService.CompleteSetup({ profile })
					}
				});
			}}
			skipToPage={3}
			transitionAnimationDuration={300}
			subTitleStyles={{ fontSize: 20 }}
			pages={[
				{
					backgroundColor: sectionBackground,
					image: (
						<Section
							backgroundColour={profile.theme === ProfileTheme.DARK ? 'white' : sectionBackground}
						>
							<Image
								source={ShoppingList}
								width={200}
								height={200}
								accessibilityIgnoresInvertColors
							/>
						</Section>
					),
					title: 'Keep track of your items',
					subtitle:
						'You can maintain multiple shopping lists, you can have one for each store you visit'
				},
				{
					backgroundColor: sectionBackground,
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
					backgroundColor: sectionBackground,
					image: (
						<Image source={Customize} width={200} height={200} accessibilityIgnoresInvertColors />
					),
					title: 'Day and night theme',
					subtitle: 'Switch between a day and night theme in the settings'
				},
				{
					backgroundColor: sectionBackground,
					image: <Image source={Done} width={200} height={200} accessibilityIgnoresInvertColors />,
					title: 'Are you ready ?',
					subtitle:
						'You have completed the tutorial, you can now start using the shopping list assistant'
				}
			]}
		/>
	);
};

export default Onboarding;
