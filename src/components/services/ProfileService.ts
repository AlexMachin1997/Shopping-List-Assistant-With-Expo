import { Profile, ProfileTheme } from '../../../types/profile';

class ProfileService {
	static CompleteSetup({ profile }: { profile: Profile }) {
		return {
			...profile,
			hasCompletedSetup: true
		};
	}

	static ChangeTheme({ profile = null }: { profile: Profile }) {
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
