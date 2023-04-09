// Core react dependencies
import * as React from 'react';
import { ScrollView } from 'react-native';

// React-Navigation dependencies
import { useNavigation } from '@react-navigation/native';

// Styled-Components dependencies
import { useTheme } from 'styled-components';

import ApplicationIcon from '../../../../assets/App-Icon.png';

// Components
import { Image, Section } from '../../core';

import DrawerLink from './DrawerLink';

// Custom hooks
import { useUserProfile } from '../../../hooks';

export const NavigationDrawer = () => {
	const { darkBlue, lightBlue } = useTheme();

	const { state } = useUserProfile();

	const { navigate } = useNavigation();

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
				<DrawerLink
					action={() => navigate('Tabs')}
					icon='format-list-bulleted'
					text='Shopping lists'
				/>
			</Section>

			<Section
				paddingBottom='40px'
				justifyContent='flex-start'
				alignItems='flex-start'
				flexWrap='wrap'
				flexGrow={0}
				isDark={state.theme === 'dark'}
			>
				<DrawerLink action={() => navigate('Settings')} icon='settings' text='Settings' />
			</Section>
		</ScrollView>
	);
};
