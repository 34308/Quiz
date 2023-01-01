import AsyncStorage from '@react-native-community/async-storage';
// HAS_LAUNCHED4
// Datex
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};
export const storeData = async (value, key) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
