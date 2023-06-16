// Core react dependencies
import PropTypes from 'prop-types';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import { Section, Text, Image } from '../core';

const Empty = ({ isDark, image, label, heading, overview }) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Section justifyContent='center' alignItems='center' flexGrow={1} isDark={isDark}>
			<Section isDark={isDark}>
				<Image
					source={image}
					accessible
					accessibleLabel={label}
					progressiveRenderingEnabled
					width={150}
					height={150}
					accessibilityIgnoresInvertColors
				/>
			</Section>

			<Section marginTop={20} isDark={isDark}>
				<Text type='h1' align='center' colour={isDark ? lightBlue : darkBlue} text={heading} />
			</Section>

			<Section marginTop={5} isDark={isDark}>
				<Text align='center' colour={isDark ? lightBlue : darkBlue} text={overview} />
			</Section>
		</Section>
	);
};

Empty.defaultProps = {
	heading: 'Please insert a heading',
	overview: 'Please insert an overview',
	isDark: false,
	label: '',
	image: {}
};

Empty.propTypes = {
	image: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
	label: PropTypes.string,
	heading: PropTypes.string,
	overview: PropTypes.string,
	isDark: PropTypes.bool
};

export default Empty;
