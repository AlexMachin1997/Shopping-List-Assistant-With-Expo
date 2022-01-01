// Core react dependencies
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Expo dependencies
import { MaterialIcons } from '@expo/vector-icons';

// styled-components dependencies
import { useTheme } from 'styled-components';

// core application components
import { Text, Section } from '../../core';

// custom hooks
import { useUserProfile } from '../../../hooks';

const DrawerLink = ({ action, icon, text }) => {
	const { lightBlue, darkBlue } = useTheme();

	const { state } = useUserProfile();

	return (
		<Section
			row
			marginRight='10px'
			alignItems='center'
			backgroundColour={state.theme === 'dark' ? darkBlue : lightBlue}
		>
			<Section marginRight='10px' backgroundColour={state.theme === 'dark' ? darkBlue : lightBlue}>
				<MaterialIcons
					name={icon}
					size={50}
					color={state.theme === 'dark' ? lightBlue : darkBlue}
				/>
			</Section>
			<TouchableOpacity onPress={action} accessibilityRole='menuitem'>
				<Section
					marginRight='10px'
					backgroundColour={state.theme === 'dark' ? darkBlue : lightBlue}
				>
					<Text colour={state.theme === 'dark' ? lightBlue : darkBlue}>{text}</Text>
				</Section>
			</TouchableOpacity>
		</Section>
	);
};

DrawerLink.defaultProps = {
	action: null,
	icon: 'help-outline',
	text: 'Awesome link'
};

DrawerLink.propTypes = {
	action: PropTypes.func,
	icon: PropTypes.string,
	text: PropTypes.string
};

export default DrawerLink;
