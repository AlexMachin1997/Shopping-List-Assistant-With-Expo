import truncate from 'lodash/truncate';

// react-native-paper dependencies
import { TouchableRipple } from 'react-native-paper';

// Application components
import { Section, Text } from '../core';

type ShoppingListsCardProps = {
	action: null | (() => void);
	background: string;
	title: string;
};

const ShoppingListsCard = ({ action, background, title }: ShoppingListsCardProps) => (
	<TouchableRipple
		onPress={() => {
			if (typeof action === 'function') {
				action();
			}
		}}
		rippleColor={background}
	>
		<Section
			row
			justifyContent='space-between'
			backgroundColour={background}
			borderWidth={1}
			borderStyle='solid'
			borderColour={background}
			paddingTop={20}
			paddingBottom={20}
			paddingLeft={10}
			paddingRight={10}
			marginTop={10}
			marginBottom={10}
			marginLeft={10}
			marginRight={10}
			flexGrow={1}
		>
			<Section alignItems='center' backgroundColour={background} flexWrap='nowrap'>
				<Text type='custom' size={20} colour='white' text={truncate(title)} />
			</Section>
		</Section>
	</TouchableRipple>
);

export default ShoppingListsCard;
