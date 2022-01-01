import * as React from 'react';

const snackBarReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SNACKBAR_STATE': {
			return {
				...state,
				visible: action?.payload?.visible ?? false,
				content: action?.payload?.content ?? ''
			};
		}

		case 'RESET_SNACKBAR_STATE': {
			return {
				...state,
				visible: false,
				content: ''
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
		content: ''
	});

	return {
		state,
		dispatch
	};
};

export default useSnackBar;
