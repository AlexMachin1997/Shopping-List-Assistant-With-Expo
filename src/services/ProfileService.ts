import { Profile, ProfileTheme } from '../types/Profile';

class ProfileService {
	static CompleteSetup({ profile = null }: { profile?: Profile }) {
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

	static ReCompleteSetup({ profile = null }: { profile: Profile }) {
		return {
			...profile,
			hasCompletedSetup: false
		};
	}
}

export default ProfileService;
