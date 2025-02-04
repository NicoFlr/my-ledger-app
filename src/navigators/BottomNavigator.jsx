import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {EventsNavigator} from './EventsNavigator';
import {Header} from '../components/header/Header';
import {MyDocuments} from './MyDocuments';
import {AgendaNavigator} from './AgendaNavigator';
import {useSelector} from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export function BottomNavigator() {
  const userAttributes = useSelector(state => state.user);
  const eventAttributes = useSelector(state => state.events);


  return (
    <>
      <StatusBar hidden={false}/>
      <Header />
      <Tab.Navigator
        initialRouteName="TabEvents">
        <Tab.Screen
          name="TabEvents"
          component={EventsNavigator}
          options={{
            tabBarLabel: 'Transactions',
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
