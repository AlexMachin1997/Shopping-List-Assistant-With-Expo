// Core react dependencies
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

// styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import { Section } from '../core';

const Loading = ({ isDark }) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Section justifyContent='center' flexGrow={1} alignItems='center'>
			<ActivityIndicator size='large' color={isDark ? lightBlue : darkBlue} />
		</Section>
	);
};

Loading.defaultProps = {
	isDark: false
};

Loading.propTypes = {
	isDark: PropTypes.bool
};

export default Loading;
