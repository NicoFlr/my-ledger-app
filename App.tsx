/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect}  from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import store from './src/redux/Store.js';
import {Main} from './Main.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
const clearStorageOnStart = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared on app start');
  } catch (error) {
    console.log('Error clearing AsyncStorage:', error);
  }
};


function App() {
  useEffect(() => {
    clearStorageOnStart();
  }, []);
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
