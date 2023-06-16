// Styled-components dependencies
import styled from 'styled-components/native';

import type { FlexStyle } from 'react-native';
import { DefaultTheme } from 'styled-components';

interface BaseProps extends FlexStyle {
	row: boolean;
	backgroundColour: string;
	isDark?: boolean;
	borderColour: string;
	borderStyle:
		| 'dashed'
		| 'dotted'
		| 'double'
		| 'groove'
		| 'hidden'
		| 'inherit'
		| 'initial'
		| 'inset'
		| 'none'
		| 'outset'
		| 'revert'
		| 'ridge'
		| 'solid'
		| 'unset';
}

interface PartialProps extends Partial<BaseProps> {
	theme: DefaultTheme;
}

const Section = styled.View`
	flex-direction: ${(props: PartialProps) => (props.row ? 'row' : 'column')};
	justify-content: ${(props: PartialProps) => props?.justifyContent ?? 'flex-start'};
	align-items: ${(props: PartialProps) => props?.alignItems ?? 'flex-start'};
	flex-wrap: ${(props: PartialProps) => props?.flexWrap ?? 'nowrap'};
	background-color: ${(props: PartialProps) => {
		// If there is a background colour provided prioritize that instead
		if (typeof props.backgroundColour === 'string') {
			return props.backgroundColour;
		}

		// If the user has a dark theme return this colour
		if (props?.isDark === true ?? false) {
			return props.theme.darkBlue;
		}

		// By default if none of the above is met just return the light mode background colour
		return props.theme.lightBlue;
	}};
	flex-grow: ${(props: PartialProps) => props?.flexGrow ?? 0};
	border-width: ${(props: PartialProps) => `${props.borderWidth ?? 1}px`};
	border-style: ${(props: PartialProps) => props?.borderStyle ?? 'solid'};
	border-color: ${(props: PartialProps) => props?.borderColour ?? 'transparent'};
	padding-top: ${(props: PartialProps) => `${props?.paddingTop ?? 0}px`};
	padding-bottom: ${(props: PartialProps) => `${props?.paddingBottom ?? 0}px`};
	padding-right: ${(props: PartialProps) => `${props?.paddingRight ?? 0}px`};
	padding-left: ${(props: PartialProps) => `${props?.paddingLeft ?? 0}px`};
	margin-top: ${(props: PartialProps) => `${props?.marginTop ?? 0}px`};
	margin-bottom: ${(props: PartialProps) => `${props?.marginBottom ?? 0}px`};
	margin-right: ${(props: PartialProps) => `${props?.marginRight ?? 0}px`};
	margin-left: ${(props: PartialProps) => `${props?.marginLeft ?? 0}px`};
`;

export default Section;
