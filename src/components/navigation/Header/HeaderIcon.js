import * as React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';

import { TouchableRipple } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';

export const HeaderIcon = ({ marginRight, marginLeft, action, icon }) => {
	const { brightPink } = useTheme();

	return (
		<View
			style={{
				marginRight,
				marginLeft
			}}
		>
			<TouchableRipple
				onPress={() => {
					if (action) {
						action();
					}
				}}
				rippleColor={brightPink}
			>
				<MaterialIcons name={icon} size={30} color='#CCDBDC' />
			</TouchableRipple>
		</View>
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
