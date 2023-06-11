// eslint-disable-next-line no-shadow
export enum ProfileTheme {
	LIGHT = 'light',
	DARK = 'dark'
}

export type Profile = {
	theme: ProfileTheme;
	hasCompletedSetup: boolean;
};
