// Core react dependencies
import PropTypes from 'prop-types';

import truncate from 'lodash/truncate';

// react-native-paper dependencies
import { TouchableRipple } from 'react-native-paper';

// Application components
import { Section, Text } from '../core';

const ShoppingListsCard = ({ action, background, title }) => (
	<TouchableRipple
		onPress={() => {
			if (action) {
				action();
			}
		}}
		rippleColor={background}
	>
		<Section
			row
			justifyContent='space-between'
			backgroundColour={background}
			borderWidth='1px'
			borderStyle='solid'
			borderColour={background}
			paddingTop='20px'
			paddingBottom='20px'
			paddingLeft='10px'
			paddingRight='10px'
			marginTop='10px'
			marginBottom='10px'
			marginLeft='10px'
			marginRight='10px'
			flexGrow={1}
		>
			<Section alignItems='center' backgroundColour={background} flexWrap='nowrap'>
				<Text size='20px' colour='white'>
					{truncate(title)}
				</Text>
			</Section>
		</Section>
	</TouchableRipple>
);

ShoppingListsCard.defaultProps = {
	background: 'blue',
	title: 'Please provide a title',
	action: null
};

ShoppingListsCard.propTypes = {
	action: PropTypes.func,
	background: PropTypes.string,
	title: PropTypes.string
};

export default ShoppingListsCard;
