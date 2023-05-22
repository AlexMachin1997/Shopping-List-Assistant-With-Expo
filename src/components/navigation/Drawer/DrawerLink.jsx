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

const DrawerLink = ({ href, icon, text, isDark }) => {
	// Access the styled-components theme via their internal ThemeContext
	const { lightBlue, darkBlue } = useTheme();

	return (
		<Section
			row
			marginRight='10px'
			alignItems='center'
			backgroundColour={isDark ? darkBlue : lightBlue}
		>
			<Section marginRight='10px' backgroundColour={isDark ? darkBlue : lightBlue}>
				<MaterialIcons name={icon} size={50} color={isDark ? lightBlue : darkBlue} />
			</Section>

			<Link asChild href={href}>
				<TouchableOpacity accessibilityRole='menuitem'>
					<Section marginRight='10px' backgroundColour={isDark ? darkBlue : lightBlue}>
						<Text colour={isDark ? lightBlue : darkBlue}>{text}</Text>
					</Section>
				</TouchableOpacity>
			</Link>
		</Section>
	);
};

DrawerLink.defaultProps = {
	icon: 'help-outline',
	text: 'Awesome link',
	isDark: false
};

DrawerLink.propTypes = {
	href: PropTypes.string.isRequired,
	icon: PropTypes.string,
	text: PropTypes.string,
	isDark: PropTypes.bool
};

export default DrawerLink;
