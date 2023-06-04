class ProfileService {
	static CompleteSetup({ profile = null }) {
		return {
			...profile,
			hasCompletedSetup: true
		};
	}

	static ChangeTheme({ profile = null }) {
		return {
			...profile,
			theme: profile.theme === 'light' ? 'dark' : 'light'
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
