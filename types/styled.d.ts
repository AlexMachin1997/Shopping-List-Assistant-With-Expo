// import original module declarations
import 'styled-components';

// import { StyledComponentsTheme } from '../src/constants/Themes';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		darkBlue: string; // Dark blue
		lightBlue: string; // Light blue/grey
		brightPink: string; // Pink,
		green: string; // Green,
		white: string; // White...
	}
}
