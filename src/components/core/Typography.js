// Core react dependencies
import PropTypes from 'prop-types';

// styled-components dependencies
import styled from 'styled-components/native';

const Text = styled.Text`
	font-size: ${(props) => {
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
				return props.size;
			}
		}
	}};
	color: ${(props) => props.colour};
	text-align: ${(props) => props.align};
	text-decoration: ${(props) => props.textDecorationLine};
`;

Text.defaultProps = {
	colour: 'black',
	align: 'left',
	textDecorationLine: 'none',
	type: 'custom',
	size: '25px'
};

Text.propTypes = {
	colour: PropTypes.string,
	align: PropTypes.string,
	textDecorationLine: PropTypes.string,
	type: PropTypes.string,
	size: PropTypes.string
};

export default Text;
