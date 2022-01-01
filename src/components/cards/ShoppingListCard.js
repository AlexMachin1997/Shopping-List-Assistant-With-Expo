// Core react dependencies
import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { truncate } from 'lodash';

// react-native-paper dependencies
import { IconButton, ToggleButton, TouchableRipple } from 'react-native-paper';

// styled-components dependencies
import { useTheme } from 'styled-components';

// application components
import { Section, Text } from '../core';

const ShoppingListCard = ({
	toggle,
	shoppingListTheme,
	isComplete,
	name,
	isDark,
	deleteAction
}) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<TouchableRipple onPress={toggle} rippleColor={shoppingListTheme}>
			<Section
				row
				paddingTop='10px'
				paddingBottom='10px'
				paddingLeft='10px'
				paddingRight='10px'
				marginTop='10px'
				marginBottom='10px'
				marginLeft='10px'
				marginRight='10px'
				borderWidth='1px'
				borderStyle='solid'
				borderColour={isDark ? lightBlue : 'white'}
				alignItems='center'
				flexWrap='wrap'
				backgroundColour={isDark ? lightBlue : 'white'}
			>
				<Section
					row
					alignItems='center'
					flexWrap='wrap'
					backgroundColour={isDark ? lightBlue : 'white'}
				>
					<ToggleButton
						icon={isComplete ? 'radiobox-marked' : 'radiobox-blank'}
						color={isComplete ? 'green' : darkBlue}
						style={{ backgroundColor: 'transparent' }}
						value={isComplete}
						status={isComplete ? 'checked' : 'unchecked'}
						onPress={toggle}
						size={30}
						accessibilityLabel='Toggle the items complete property'
						accessibilityHint='Marks the shopping list item as complete or not complete'
					/>
				</Section>

				<View style={{ flex: 1 }}>
					<Text type='h3'>{truncate(name)}</Text>
				</View>

				<Section
					row
					alignItems='flex-end'
					flexWrap='wrap'
					backgroundColour={isDark ? lightBlue : 'white'}
				>
					<IconButton
						icon='delete-forever'
						color='red'
						size={40}
						onPress={() => {
							if (deleteAction) {
								deleteAction();
							}
						}}
						animated
						style={{ margin: 0 }}
						accessibilityLabel='Delete item'
						accessibilityHint='Performs a delete action for the shopping list item'
					/>
				</Section>
			</Section>
		</TouchableRipple>
	);
};

ShoppingListCard.defaultProps = {
	toggle: () => false,
	shoppingListTheme: '',
	isComplete: false,
	name: '',
	isDark: false,
	deleteAction: null
};

ShoppingListCard.propTypes = {
	toggle: PropTypes.func,
	shoppingListTheme: PropTypes.string,
	isComplete: PropTypes.bool,
	name: PropTypes.string,
	isDark: PropTypes.bool,
	deleteAction: PropTypes.func
};

export default ShoppingListCard;
