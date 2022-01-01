// Core react dependencies
import PropTypes from 'prop-types';

// styled-components dependencies
import styled from 'styled-components/native';

const Image = styled.Image`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	border-radius: ${(props) => props.radius};
`;

Image.defaultProps = {
	width: '100px',
	height: '100px',
	radius: 0
};

Image.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	radius: PropTypes.number
};

export default Image;
