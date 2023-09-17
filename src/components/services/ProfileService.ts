import { Profile, ProfileTheme } from '../../../types/Profile';

class ProfileService {
	static CompleteSetup({ profile = null }: { profile: Profile }) {
		if (profile === null) throw Error('Profile is required');

		return {
			...profile,
			hasCompletedSetup: true
		};
	}

	static ChangeTheme({ profile = null }: { profile: Profile }) {
		if (profile === null) throw Error('Profile is required');

		return {
			...profile,
			theme: profile.theme === ProfileTheme.DARK ? ProfileTheme.LIGHT : ProfileTheme.DARK
		};
	}

	static Reset() {
		return {
			hasCompletedSetup: false,
			theme: 'light'
		};
	}
}

export default ProfileService;
