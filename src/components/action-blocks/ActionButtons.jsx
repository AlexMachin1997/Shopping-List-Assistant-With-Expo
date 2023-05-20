// React dependencies
import * as React from 'react';
import PropTypes from 'prop-types';

// react-native-paper dependencies
import { FAB } from 'react-native-paper';

// styled-components dependencies
import { useTheme } from 'styled-components';

const ActionButtons = ({ actions }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	// Access the styled-components theme via their internal ThemeContext
	const { brightPink } = useTheme();

	return (
		<FAB.Group
			open={isOpen}
			fabStyle={{ backgroundColor: brightPink }}
			icon={isOpen ? 'close' : 'plus'}
			actions={actions}
			onStateChange={() => {
				setIsOpen((prevState) => !prevState);
			}}
		/>
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
