import AsyncStorage from '@react-native-community/async-storage';
const HAS_LAUNCHED = 'HAS_LAUNCHED';
export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('HAS_LAUNCHED3');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};
export const storeData = async value => {
  try {
    await AsyncStorage.setItem('HAS_LAUNCHED3', value);
  } catch (e) {
    // saving error
  }
};
