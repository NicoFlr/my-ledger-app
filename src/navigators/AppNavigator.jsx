import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/login/Login';
import {UserStatus} from '../models/Enums';
import Transactions from '../screens/transactions/Transactions';

const Stack = createNativeStackNavigator();

export function AppNavigator({userSession}) {
  const getInitalRoute = () => {
    return userSession === UserStatus.loggedIn
      ? 'Transactions'
      : 'Login';
  };

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={getInitalRoute()}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
        />
    </Stack.Navigator>
  );
}
