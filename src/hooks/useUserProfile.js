// Core react dependencies
import * as React from 'react';

import { UserProfileContext } from '../context';

const useUserProfile = () => {
	const context = React.useContext(UserProfileContext);

	if (!context) throw Error('useUserProfile requires a SettingsContext');

	return context;
};

export default useUserProfile;
