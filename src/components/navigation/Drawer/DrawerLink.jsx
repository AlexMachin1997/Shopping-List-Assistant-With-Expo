// Core react dependencies
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

//
import { Link } from 'expo-router';

// Expo dependencies
import { MaterialIcons } from '@expo/vector-icons';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Core application components
import { Text, Section } from '../../core';

// Application hooks
import { useUserProfile } from '../../../hooks';

const DrawerLink = ({ href, icon, text }) => {
	// Access the styled-components theme via their internal ThemeContext
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

			<Link asChild href={href}>
				<TouchableOpacity accessibilityRole='menuitem'>
					<Section
						marginRight='10px'
						backgroundColour={state.theme === 'dark' ? darkBlue : lightBlue}
					>
						<Text colour={state.theme === 'dark' ? lightBlue : darkBlue}>{text}</Text>
					</Section>
				</TouchableOpacity>
			</Link>
		</Section>
	);
};

DrawerLink.defaultProps = {
	icon: 'help-outline',
	text: 'Awesome link'
};

DrawerLink.propTypes = {
	href: PropTypes.string.isRequired,
	icon: PropTypes.string,
	text: PropTypes.string
};

export default DrawerLink;
