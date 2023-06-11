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
import { ProfileTheme } from '../../../../types/profile';

export const NavigationDrawer = () => {
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
				flex: 1
			}}
		>
			<Section
				paddingTop='50px'
				paddingBottom='50px'
				justifyContent='center'
				alignItems='center'
				isDark={(profile?.theme ?? ProfileTheme.LIGHT) === ProfileTheme.DARK}
			>
				<Image source={ApplicationIcon} height={120} width={120} accessibilityIgnoresInvertColors />
			</Section>

			<Section
				paddingBottom='40px'
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
				paddingBottom='40px'
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
		</ScrollView>
	);
};
