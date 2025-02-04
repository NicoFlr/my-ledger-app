import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveObjectItem = async (key, value) => {
  const parsedValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, parsedValue);
  } catch (error) {
    console.log(`Error saving key ${key}` + error);
  }
};

export const saveStringItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error saving key ${key}` + error);
  }
};

export const getObjectItem = async key => {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`Error getting key ${key}` + error);
    value = undefined;
  }
  return JSON.parse(value);
};

export const getStringItem = async key => {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`Error getting key ${key}` + error);
  }
  return value;
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error getting key ${key}` + error);
  }
};
