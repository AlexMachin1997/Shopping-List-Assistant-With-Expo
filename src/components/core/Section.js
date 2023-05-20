// Styled-components dependencies
import styled from 'styled-components/native';

// Core react dependencies
import PropTypes from 'prop-types';

const Section = styled.View`
	flex-direction: ${(props) => (props.row ? 'row' : 'column')};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	flex-wrap: ${(props) => props.flexWrap};
	background-color: ${(props) => {
		if (props.backgroundColour) {
			return props.backgroundColour;
		}
		if (props.isDark) {
			return props.theme.darkBlue;
		}
		return props.theme.lightBlue;
	}};
	flex-grow: ${(props) => props.flexGrow};
	border-width: ${(props) => props.borderWidth};
	border-style: ${(props) => props.borderStyle};
	border-color: ${(props) => props.borderColour};
	padding-top: ${(props) => props.paddingTop};
	padding-bottom: ${(props) => props.paddingBottom};
	padding-right: ${(props) => props.paddingRight};
	padding-left: ${(props) => props.paddingLeft};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-right: ${(props) => props.marginRight};
	margin-left: ${(props) => props.marginLeft};
`;

Section.defaultProps = {
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
	flexWrap: 'nowrap',
	flexGrow: 0,

	borderWidth: '0px',
	borderStyle: 'solid',
	borderColour: 'black',

	paddingTop: '0',
	paddingBottom: '0',
	paddingRight: '0',
	paddingLeft: '0',

	marginTop: '0',
	marginBottom: '0',
	marginRight: '0',
	marginLeft: '0'
};

Section.propTypes = {
	justifyContent: PropTypes.string,
	alignItems: PropTypes.string,
	flexWrap: PropTypes.string,
	backgroundColour: PropTypes.string,
	flexGrow: PropTypes.number,

	borderWidth: PropTypes.string,
	borderStyle: PropTypes.string,
	borderColour: PropTypes.string,

	paddingTop: PropTypes.string,
	paddingBottom: PropTypes.string,
	paddingLeft: PropTypes.string,
	paddingRight: PropTypes.string,

	marginTop: PropTypes.string,
	marginBottom: PropTypes.string,
	marginLeft: PropTypes.string,
	marginRight: PropTypes.string
};

export default Section;
