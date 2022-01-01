// Core react dependencies
import * as React from 'react';
import PropTypes from 'prop-types';

// react-native-paper dependencies
import { Button as ReactNativePaperButton } from 'react-native-paper';

const Button = ({
	mode,
	isCompact,
	colour,
	contentStyle,
	onClick,
	label,
	isDisabled,
	isDark,
	text,
	accessabilityHint,
	labelStyle,
	...additionalProperties
}) => (
	<ReactNativePaperButton
		mode={mode}
		compact={isCompact}
		color={colour}
		contentStyle={contentStyle}
		onPress={() => {
			if (onClick) {
				onClick();
			}
		}}
		accessibilityLabel={label}
		accessibilityHint={accessabilityHint}
		disabled={isDisabled}
		dark={isDark}
		labelStyle={labelStyle}
		{...additionalProperties}
	>
		{text}
	</ReactNativePaperButton>
);

Button.propTypes = {
	mode: PropTypes.oneOf(['text', 'contained', 'outlined']),
	isCompact: PropTypes.bool,
	colour: PropTypes.string,
	contentStyle: PropTypes.object,
	onClick: PropTypes.func,
	label: PropTypes.string,
	isDisabled: PropTypes.bool,
	isDark: PropTypes.bool,
	text: PropTypes.string,
	accessabilityHint: PropTypes.string.isRequired,
	labelStyle: PropTypes.objectOf(PropTypes.any)
};

Button.defaultProps = {
	mode: 'text',
	isCompact: false,
	colour: '',
	contentStyle: {},
	onClick: null,
	label: '',
	isDisabled: false,
	isDark: false,
	text: '',
	labelStyle: {}
};

export default Button;
