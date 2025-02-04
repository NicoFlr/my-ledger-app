import React, {useRef, useState, useEffect} from 'react';
import {AppNavigator} from './src/navigators/AppNavigator.jsx';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, ActivityIndicator} from 'react-native-paper';
import {View, useColorScheme} from 'react-native';
import {useDispatch} from 'react-redux';
import {changeRoute} from './src/redux/RouteSlices.js';
import {getStringItem} from './src/services/phone-storage-service.js';
import {PhoneStorage} from './src/constants/phoneStorageConstants.js';
import {logInUser} from './src/redux/UserSlices.js';
import {jwtDecode} from 'jwt-decode';
import {UserStatus} from './src/models/Enums.js';
import styles from './GlobalStyles.js';

export function Main() {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, setUserSession] = useState(UserStatus.loggedOut);
  const theme = useColorScheme();

  useEffect(() => {
    const startApp = async () => {
      setIsLoading(true);
      let token = await getStringItem(PhoneStorage.jwt);
      if (token !== null && token !== undefined) {
        let decodedToken = token.slice(7);
        decodedToken = jwtDecode(token);
          setUserSession(UserStatus.loggedIn);
        dispatch(
          logInUser({
            id: decodedToken.userId,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            email: decodedToken.email,
            roleId: decodedToken.roleId,
          }),
        );
      }
      setIsLoading(false);
    };
    startApp();
  }, [dispatch, theme]);

  const detectRouteChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    const standardRouteName =
      'routesNames.' +
      currentRouteName.charAt(0).toLowerCase() +
      currentRouteName.slice(1);
    if (previousRouteName !== currentRouteName) {
      dispatch(
        changeRoute({currentRouteName, previousRouteName, standardRouteName}),
      );
    }
    routeNameRef.current = currentRouteName;
  };

  return (
    <PaperProvider>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} animating={true} />
        </View>
      ) : (
        <NavigationContainer
          ref={navigationRef}
          onStateChange={detectRouteChange}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}>
          <AppNavigator userSession={userSession} />
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}
