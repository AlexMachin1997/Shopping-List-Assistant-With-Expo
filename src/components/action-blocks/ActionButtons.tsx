// Core react dependencies
import * as React from 'react';

// react-native-paper dependencies
import { FAB, Portal, FABGroupProps } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

const ActionButtons = ({
	actions,
	visible = true,
	backdropColor = 'transparent'
}: {
	actions: FABGroupProps['actions'];
	visible?: boolean;
	backdropColor?: string;
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	// Access the styled-components theme via their internal ThemeContext
	const { brightPink } = useTheme();

	return (
		<Portal>
			<FAB.Group
				visible={visible}
				open={isOpen}
				fabStyle={{ backgroundColor: brightPink }}
				backdropColor={backdropColor}
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					marginVertical: 0,
					marginHorizontal: 0
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

export default ActionButtons;
