// react-native-paper dependencies
import { Button as ReactNativePaperButton } from 'react-native-paper';

import type { ButtonProps } from 'react-native-paper';

interface Props extends ButtonProps {
	isCompact: boolean;
	colour: string;
	onClick?: null | (() => void);
	label: string;
	isDisabled?: boolean;
	isDark?: boolean;
	accessabilityHint: string;
}

const Button = ({
	mode = 'text',
	isCompact = true,
	colour = 'black',
	contentStyle,
	onClick = null,
	label,
	isDisabled = false,
	isDark = false,
	children,
	accessabilityHint,
	labelStyle
}: Props) => (
	<ReactNativePaperButton
		mode={mode}
		compact={isCompact}
		buttonColor={colour}
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
	>
		{children}
	</ReactNativePaperButton>
);

export default Button;
