// Core react dependencies
import { TouchableOpacity } from 'react-native';

// Expo dependencies
import { Href, Link } from 'expo-router';

// Expo dependencies
import { MaterialIcons } from '@expo/vector-icons';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Core application components
import { Text, Section } from '../../core';

const DrawerLink = ({
	href,
	icon,
	text,
	isDark
}: {
	href: Href<string>;
	icon: 'format-list-bulleted' | 'settings' | 'gps-fixed';
	text: string;
	isDark: boolean;
}) => {
	// Access the styled-components theme via their internal ThemeContext
	const { lightBlue, darkBlue } = useTheme();

	return (
		<Section
			row
			marginRight={10}
			alignItems='center'
			backgroundColour={isDark ? darkBlue : lightBlue}
		>
			<Section marginRight={10} backgroundColour={isDark ? darkBlue : lightBlue}>
				<MaterialIcons name={icon} size={30} color={isDark ? lightBlue : darkBlue} />
			</Section>

			<Link asChild href={href}>
				<TouchableOpacity accessibilityRole='menuitem'>
					<Section marginRight={10} backgroundColour={isDark ? darkBlue : lightBlue}>
						<Text type='custom' colour={isDark ? lightBlue : darkBlue} text={text} size={25} />
					</Section>
				</TouchableOpacity>
			</Link>
		</Section>
	);
};

export default DrawerLink;
