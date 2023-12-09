const getErrorMessage = (error: unknown) => {
	let message = 'unexpected error occurred';

	if (
		error !== null &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		message = error?.message;
	}

	return message;
};

export default getErrorMessage;
