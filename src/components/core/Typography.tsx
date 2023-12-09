/* eslint-disable react/destructuring-assignment */
// Styled-components dependencies
import styled from 'styled-components/native';

import type { TextStyle } from 'react-native';

type CommonProps = {
	colour?: string;
	align?: TextStyle['textAlign'];
	fontWeight?: TextStyle['fontWeight'];
};

interface Custom extends CommonProps {
	type: 'custom';
	size: number;
}

interface NoneCustom extends CommonProps {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

type Props = Custom | NoneCustom;

const TextElement = styled.Text`
	font-size: ${(props: Props) => {
		// If the type is null (By default it is then just use whatever the size is)
		if (props.type === 'custom') {
			return `${props.size}px`;
		}

		switch (props.type) {
			case 'h1': {
				return '32px';
			}

			case 'h2': {
				return '24px';
			}

			case 'h3': {
				return '18.72px';
			}

			case 'h4': {
				return '16px';
			}

			case 'h5': {
				return '13.28px';
			}

			case 'h6': {
				return '12px';
			}

			default: {
				return '';
			}
		}
	}};
	color: ${(props: Props) => props?.colour ?? 'black'};
	text-align: ${(props: Props) => props?.align ?? 'align'};
	font-weight: ${(props: Props) => props?.fontWeight ?? 'normal'};
`;

const Text = (props: Props & { text: string }) => {
	if (props?.type === 'custom') {
		return (
			<TextElement
				type='custom'
				size={props?.size ?? 50}
				colour={props?.colour ?? ''}
				align={props?.align ?? 'auto'}
				fontWeight={props?.fontWeight ?? 'normal'}
			>
				{props?.text ?? ''}
			</TextElement>
		);
	}

	return (
		<TextElement
			type={props.type}
			colour={props?.colour ?? ''}
			align={props?.align ?? 'auto'}
			fontWeight={props?.fontWeight ?? 'normal'}
		>
			{props?.text ?? ''}
		</TextElement>
	);
	// return <TextElement {...a}>{text}</TextElement>;
};
export default Text;
