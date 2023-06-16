// Core react dependencies
import { View } from 'react-native';

// react-native-paper dependencies
import { FAB } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

type Props = {
	icon: string;
	action?: null | (() => void);
	colour: string;
};

const ActionButton = ({ icon, action = null, colour }: Props) => {
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
				size='medium'
				icon={icon}
				onPress={() => {
					if (typeof action === 'function') {
						action();
					}
				}}
				color={colour}
			/>
		</View>
	);
};

// ActionButton.defaultProps = {
// 	icon: 'add',
// 	colour: 'white',
// 	action: null
// };

// ActionButton.propTypes = {
// 	icon: PropTypes.string,
// 	action: PropTypes.func,
// 	colour: PropTypes.string
// };

export default ActionButton;
