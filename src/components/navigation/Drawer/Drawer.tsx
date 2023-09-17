// Core react dependencies
import { ScrollView } from 'react-native';

// Styled-components dependencies
import { useTheme } from 'styled-components';

import ApplicationIcon from '../../../../assets/App-Icon.png';

// Application Components
import { Image, Section } from '../../core';
import DrawerLink from './DrawerLink';

// Application hooks
import { useProfile } from '../../../hooks';
import { ProfileTheme } from '../../../../types/Profile';

const NavigationDrawer = () => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	// Access the users profile e.g. theme to decide what colour the sections should be.
	const { profile } = useProfile();

	return (
		<ScrollView
			accessibilityRole='menubar'
			contentContainerStyle={{
				backgroundColor:
					(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK ? darkBlue : lightBlue,
				flex: 1,
				padding: 15
			}}
		>
			<Section
				paddingTop={100}
				paddingBottom={50}
				justifyContent='center'
				alignItems='center'
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
			>
				<Image source={ApplicationIcon} height={120} width={120} accessibilityIgnoresInvertColors />
			</Section>

			<Section
				paddingBottom={20}
				justifyContent='flex-start'
				alignItems='flex-start'
				flexWrap='wrap'
				flexGrow={0}
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
			>
				<DrawerLink
					href='(tabs)/ShoppingLists'
					icon='format-list-bulleted'
					text='Shopping lists'
					isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				/>
			</Section>

			<Section
				paddingBottom={20}
				justifyContent='flex-start'
				alignItems='flex-start'
				flexWrap='wrap'
				flexGrow={0}
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
			>
				<DrawerLink
					href='/settings'
					icon='settings'
					text='Settings'
					isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				/>
			</Section>

			<Section
				paddingBottom={20}
				justifyContent='flex-start'
				alignItems='flex-start'
				flexWrap='wrap'
				flexGrow={0}
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
			>
				<DrawerLink
					href='(tabs)/StoreTracker'
					icon='gps-fixed'
					text='Store Tracking'
					isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
				/>
			</Section>
		</ScrollView>
	);
};

export default NavigationDrawer;
