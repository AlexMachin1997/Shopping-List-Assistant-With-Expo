// Core react dependencies
import { View } from 'react-native';
import PropTypes from 'prop-types';

// react-native-paper dependencies
import { FAB } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

const ActionButton = ({ icon, action, colour }) => {
	// Access the styled-components theme via their internal ThemeContext
	const { brightPink } = useTheme();

	return (
		<View
			style={{
				position: 'absolute',
				bottom: 0,
				right: 0,
				margin: 10
			}}
		>
			<FAB
				style={{ backgroundColor: brightPink }}
				large
				icon={icon}
				onPress={() => {
					if (action) {
						action();
					}
				}}
				color={colour}
			/>
		</View>
	);
};

ActionButton.defaultProps = {
	icon: 'add',
	colour: 'white',
	action: null
};

ActionButton.propTypes = {
	icon: PropTypes.string,
	action: PropTypes.func,
	colour: PropTypes.string
};

export default ActionButton;
