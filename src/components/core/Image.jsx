// Core react dependencies
import PropTypes from 'prop-types';

// styled-components dependencies
import styled from 'styled-components/native';

const Image = styled.Image`
	width: ${(props) => `${props.width}px`};
	height: ${(props) => `${props.height}px`};
	border-radius: ${(props) => props.radius};
`;

Image.defaultProps = {
	width: 100,
	height: 100,
	radius: 0
};

Image.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	radius: PropTypes.number
};

export default Image;
