// Core react dependencies
import { ScrollView } from 'react-native';

// Styled-components dependencies
import { useTheme } from 'styled-components';

import ApplicationIcon from '../../../../assets/App-Icon.png';

// Components
import { Image, Section } from '../../core';

import DrawerLink from './DrawerLink.jsx';

// Application hooks
import { useUserProfile } from '../../../hooks';

export const NavigationDrawer = () => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	// Access the users profile e.g. theme to decide what colour the sections should be.
	const { state } = useUserProfile();

	return (
		<ScrollView
			accessibilityRole='menubar'
			contentContainerStyle={{
				backgroundColor: state.theme === 'dark' ? darkBlue : lightBlue,
				flex: 1
			}}
		>
			<Section
				paddingTop='50px'
				paddingBottom='50px'
				justifyContent='center'
				alignItems='center'
				isDark={state.theme === 'dark'}
			>
				<Image source={ApplicationIcon} height={120} width={120} accessibilityIgnoresInvertColors />
			</Section>

			<Section
				paddingBottom='40px'
				justifyContent='flex-start'
				alignItems='flex-start'
				flexWrap='wrap'
				flexGrow={0}
				isDark={state.theme === 'dark'}
			>
				<DrawerLink href='(tabs)/ShoppingLists' icon='format-list-bulleted' text='Shopping lists' />
			</Section>

			<Section
				paddingBottom='40px'
				justifyContent='flex-start'
				alignItems='flex-start'
				flexWrap='wrap'
				flexGrow={0}
				isDark={state.theme === 'dark'}
			>
				<DrawerLink href='/settings' icon='settings' text='Settings' />
			</Section>
		</ScrollView>
	);
};
