import type { ImageSourcePropType } from 'react-native';

// Styled-components dependencies
import { useTheme } from 'styled-components';

// Application components
import { Section, Text, Image } from '../core';

const EmptyOrError = ({
	isDark,
	image,
	heading,
	overview
}: {
	isDark: boolean;
	image: ImageSourcePropType;
	heading: string;
	overview: string;
}) => {
	// Access the styled-components theme via their internal ThemeContext
	const { darkBlue, lightBlue } = useTheme();

	return (
		<Section
			justifyContent='center'
			alignItems='center'
			flexGrow={1}
			isDark={isDark}
			paddingLeft={5}
			paddingRight={5}
		>
			<Section isDark={isDark}>
				<Image
					source={image}
					accessible
					progressiveRenderingEnabled
					width={150}
					height={150}
					accessibilityIgnoresInvertColors
				/>
			</Section>

			<Section marginTop={20} isDark={isDark}>
				<Text
					type='h1'
					align='center'
					colour={isDark ? lightBlue : darkBlue}
					text={heading}
					fontWeight='600'
				/>
			</Section>

			<Section marginTop={5} isDark={isDark} marginLeft={20} marginRight={20}>
				<Text
					type='custom'
					size={20}
					align='center'
					colour={isDark ? lightBlue : darkBlue}
					text={overview}
				/>
			</Section>
		</Section>
	);
};

export default EmptyOrError;
