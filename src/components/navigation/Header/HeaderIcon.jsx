import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';

import { TouchableRipple } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';

export const HeaderIcon = ({ marginRight, marginLeft, action, icon }) => {
	// Access the styled-components theme via their internal ThemeContext
	const { brightPink } = useTheme();

	return (
		<TouchableRipple
			onPress={() => {
				if (action) {
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

HeaderIcon.defaultProps = {
	marginRight: 0,
	marginLeft: 0,
	action: null,
	icon: 'menu'
};

HeaderIcon.propTypes = {
	marginLeft: PropTypes.number,
	marginRight: PropTypes.number,
	action: PropTypes.func,
	icon: PropTypes.string
};
