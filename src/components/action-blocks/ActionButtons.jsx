// Core react dependencies
import * as React from 'react';
import PropTypes from 'prop-types';

// react-native-paper dependencies
import { FAB, Portal } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

const ActionButtons = ({ actions }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	// Access the styled-components theme via their internal ThemeContext
	const { brightPink } = useTheme();

	return (
		<Portal>
			<FAB.Group
				open={isOpen}
				fabStyle={{ backgroundColor: brightPink }}
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0
				}}
				icon={isOpen ? 'close' : 'plus'}
				actions={actions}
				onStateChange={() => {
					setIsOpen((prevState) => !prevState);
				}}
				color='white'
			/>
		</Portal>
	);
};

ActionButtons.defaultProps = {
	actions: []
};

ActionButtons.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string,
			label: PropTypes.string,
			onPress: PropTypes.func,
			color: PropTypes.string,
			accessibilityLabel: PropTypes.string
		})
	)
};

export default ActionButtons;
