// Styled-components dependencies
import styled from 'styled-components/native';

import type { TextStyle } from 'react-native';
import { useMemo } from 'react';

type Props =
	| {
			type?: 'custom';
			size: number;
			colour?: string;
			align?: TextStyle['textAlign'];
			textDecoration?: TextStyle['textDecorationStyle'];
	  }
	| {
			type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
			size?: undefined;
			colour?: string;
			align?: TextStyle['textAlign'];
			textDecoration?: TextStyle['textDecorationStyle'];
	  };

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
	text-decoration: ${(props: Props) => props?.textDecoration ?? undefined};
`;

const Text = ({
	text,
	type = 'custom',
	size = 16,
	colour = 'black',
	align = 'auto',
	textDecoration = 'solid'
}: Props & { text: string }) => {
	const a = useMemo(() => {
		if (type === 'custom') {
			return {
				type,
				size,
				colour,
				align,
				textDecoration
			};
		}

		return {
			type,
			colour,
			align,
			textDecoration
		};
	}, [align, colour, size, textDecoration, type]);

	return <TextElement {...a}>{text}</TextElement>;
};
export default Text;
