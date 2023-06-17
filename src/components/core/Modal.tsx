// react-native-paper dependencies
import { Dialog, Portal } from 'react-native-paper';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import Button from './Button';

type Props = {
	visible: boolean;
	onDismiss: null | (() => void);
	isDark: boolean;
	submitDisabled: boolean;
	onOk: null | (() => void);
	onCancel: null | (() => void);
	children: React.ReactNode;
	title: string;
	accessabilityOkHint: string;
	accessabilityCancelHint: string;
};

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
}: Props) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue } = useTheme();

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => {
					if (typeof onDismiss === 'function') {
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
						colour='#e91e63'
						contentStyle={{
							borderRadius: 5
						}}
						labelStyle={{
							color: 'white'
						}}
						label='Cancel action'
						onClick={() => {
							if (typeof onCancel === 'function') {
								onCancel();
							}
						}}
						isDark={isDark}
						isDisabled={false}
						accessabilityHint={accessabilityCancelHint}
					>
						Cancel
					</Button>
					<Button
						isCompact
						mode='text'
						colour='#e91e63'
						contentStyle={{
							borderRadius: 5
						}}
						labelStyle={{
							color: 'white'
						}}
						label='Confirm button'
						onClick={() => {
							if (typeof onOk === 'function') {
								onOk();
							}
						}}
						isDark={isDark}
						isDisabled={submitDisabled}
						accessabilityHint={accessabilityOkHint}
					>
						Confirm
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default Modal;
