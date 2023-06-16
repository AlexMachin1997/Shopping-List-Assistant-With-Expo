/* eslint-disable react-native-a11y/has-accessibility-hint */
// Core react dependencies
import { View } from 'react-native';

import { truncate } from 'lodash';

// react-native-paper dependencies
import { IconButton, ToggleButton, TouchableRipple } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import { Section, Text } from '../core';

type Props = {
	toggle: null | (() => void);
	shoppingListTheme?: string;
	isComplete?: boolean;
	name?: string;
	isDark?: boolean;
	deleteAction?: null | (() => void);
	disabled?: boolean;
};

const ShoppingListCard = ({
	toggle = null,
	shoppingListTheme = 'N/A',
	isComplete = false,
	name = 'N/A',
	isDark = false,
	deleteAction = null,
	disabled = false
}: Props) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue, green } = useTheme();

	return (
		<TouchableRipple
			onPress={() => {
				if (typeof toggle === 'function') {
					toggle();
				}
			}}
			rippleColor={shoppingListTheme}
		>
			<Section
				row
				paddingTop={10}
				paddingBottom={10}
				paddingLeft={10}
				paddingRight={10}
				marginTop={10}
				marginBottom={10}
				marginLeft={10}
				marginRight={10}
				borderWidth={1}
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
						iconColor={isComplete ? green : darkBlue}
						style={{ backgroundColor: 'transparent' }}
						value={isComplete === true ? 'checked' : 'unchecked'}
						status={isComplete ? 'checked' : 'unchecked'}
						onPress={() => {
							if (typeof toggle === 'function') {
								toggle();
							}
						}}
						size={30}
						accessibilityLabel='Toggle the items complete property'
						// accessibilityHint='Marks the shopping list item as complete or not complete'
					/>
				</Section>

				<View style={{ flex: 1 }}>
					<Text type='h3' text={truncate(name)} />
				</View>

				<Section
					row
					alignItems='flex-end'
					flexWrap='wrap'
					backgroundColour={isDark ? lightBlue : 'white'}
				>
					<IconButton
						icon='delete-forever'
						iconColor='red'
						size={40}
						onPress={() => {
							if (deleteAction && disabled === false) {
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

export default ShoppingListCard;
