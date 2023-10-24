// Styled-components dependencies
import styled from 'styled-components/native';

type Props = {
	width?: number;
	height?: number;
	radius?: number;
};

const Image = styled.Image`
	width: ${(props: Props) => `${props?.width ?? 100}px`};
	height: ${(props: Props) => `${props?.height ?? 100}px`};
	border-radius: ${(props: Props) => props?.radius ?? 0};
`;

export default Image;
