// Styled-components dependencies
import { useTheme } from 'styled-components';

// react-native-paper dependencies
import { TouchableRipple } from 'react-native-paper';

// Expo dependencies
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const HeaderIcon = ({
	marginRight = 0,
	marginLeft = 0,
	action = null,
	icon = 'arrow-back'
}: {
	marginRight?: number;
	marginLeft?: number;
	action?: null | (() => void);
	icon?: 'settings' | 'menu' | 'arrow-back';
}) => {
	// Access the styled-components theme via their internal ThemeContext
	const { brightPink } = useTheme();

	return (
		<TouchableRipple
			onPress={() => {
				if (typeof action === 'function') {
					action();
				}
			}}
			rippleColor={brightPink}
			style={{
				marginRight,
				marginLeft
			}}
		>
			<MaterialIcons name={icon} size={30} color='#CCDBDC' />
		</TouchableRipple>
	);
};

export default HeaderIcon;
