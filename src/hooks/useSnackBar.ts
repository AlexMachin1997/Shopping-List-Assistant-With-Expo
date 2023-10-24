import * as React from 'react';

// Project constants
import { StyledComponentsTheme } from '../constants/Themes';

type TOAST_NOTIFICATION_STATE = {
	visible: boolean;
	content: string;
	backgroundColour: string;
};

type TOAST_REDUCER =
	| {
			type: 'RESET_TOAST_NOTIFICATION';
	  }
	| {
			type: 'SUCCESSFUL_TOAST_NOTIFICATION' | 'ERROR_TOAST_NOTIFICATION';
			payload: {
				message: string;
			};
	  };

const snackBarReducer = (state: TOAST_NOTIFICATION_STATE, action: TOAST_REDUCER) => {
	switch (action.type) {
		case 'RESET_TOAST_NOTIFICATION': {
			return {
				...state,
				visible: false,
				content: '',
				backgroundColour: ''
			};
		}

		case 'SUCCESSFUL_TOAST_NOTIFICATION': {
			return {
				...state,
				visible: true,
				content: action.payload.message,
				backgroundColour: StyledComponentsTheme.green
			};
		}

		case 'ERROR_TOAST_NOTIFICATION': {
			return {
				...state,
				visible: true,
				content: action.payload.message,
				backgroundColour: 'red'
			};
		}

		default: {
			console.warn('snackBarReducer: Unknown action fired');

			return state;
		}
	}
};

const useSnackBar = () => {
	const [state, dispatch] = React.useReducer(snackBarReducer, {
		visible: false,
		content: '',
		backgroundColour: ''
	});

	return {
		state,
		dispatch
	};
};

export default useSnackBar;
