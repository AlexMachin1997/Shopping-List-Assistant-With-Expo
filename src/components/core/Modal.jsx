// Core react dependencies
import PropTypes from 'prop-types';

// react-native-paper dependencies
import { Dialog, Portal } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import Button from './Button';

const Modal = ({
	visible,
	onDismiss,
	isDark,
	submitDisabled,
	onOk,
	onCancel,
	children,
	title,
	accessabilityOkHint,
	accessabilityCancelHint
}) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue } = useTheme();

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => {
					if (onDismiss) {
						onDismiss();
					}
				}}
				style={{
					backgroundColor: darkBlue,
					borderWidth: 1,
					borderColor: 'white'
				}}
			>
				<Dialog.Title
					style={{
						backgroundColor: darkBlue,
						color: isDark ? 'white' : 'white'
					}}
				>
					{title}
				</Dialog.Title>

				<Dialog.Content>{children}</Dialog.Content>

				<Dialog.Actions>
					<Button
						isCompact
						mode='text'
						text='Cancel'
						colour='#e91e63'
						contentStyle={{
							borderRadius: 5
						}}
						labelStyle={{
							color: 'white'
						}}
						label='Cancel action'
						onClick={() => {
							if (onCancel) {
								onCancel();
							}
						}}
						isDark={isDark}
						isDisabled={false}
						accessabilityHint={accessabilityCancelHint}
					/>
					<Button
						isCompact
						mode='text'
						text='Confirm'
						colour='#e91e63'
						contentStyle={{
							borderRadius: 5
						}}
						labelStyle={{
							color: 'white'
						}}
						label='Confirm button'
						onClick={() => {
							if (onOk) {
								onOk();
							}
						}}
						isDark={isDark}
						isDisabled={submitDisabled}
						accessabilityHint={accessabilityOkHint}
					/>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

Modal.defaultProps = {
	visible: false,
	title: 'Insert title',
	submitDisabled: false,
	isDark: false,
	onDismiss: null,
	onCancel: null,
	onOk: null
};

Modal.propTypes = {
	visible: PropTypes.bool,
	onDismiss: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.object]).isRequired,
	onCancel: PropTypes.func,
	onOk: PropTypes.func,
	submitDisabled: PropTypes.bool,
	isDark: PropTypes.bool,
	accessabilityOkHint: PropTypes.string.isRequired,
	accessabilityCancelHint: PropTypes.string.isRequired
};

export default Modal;
