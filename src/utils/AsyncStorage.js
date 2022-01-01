import * as AsyncStorage from 'expo-secure-store';

export const setItem = async (key, value) => {
	try {
		const string = JSON.stringify(value);

		await AsyncStorage.setItemAsync(key, string);
	} catch (error) {
		console.error(error);
	}
};

export const getItem = async (key) => {
	try {
		const data = await AsyncStorage.getItemAsync(key);

		if (data !== null) {
			return JSON.parse(data);
		}

		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const deleteItem = async (key) => {
	try {
		await AsyncStorage.deleteItemAsync(key);

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
