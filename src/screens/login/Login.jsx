import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './LoginStyles';
import {
  Button,
  TextInput,
  ActivityIndicator,
  HelperText,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import {login} from '../../services/authentication-service';
import {saveStringItem} from '../../services/phone-storage-service';
import {PhoneStorage} from '../../constants/phoneStorageConstants';
import globalStyle from '../../../GlobalStyles';
import {useDispatch} from 'react-redux';
import {logInUser} from '../../redux/UserSlices';
import {encode} from 'base-64';
import {jwtDecode} from 'jwt-decode';

export function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecurityEnble, setIsSecurityEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const hasErrorEmail = () => {
    return !email.includes('@') || email === '';
  };

  const hasErrorPassword = () => {
    return password === '';
  };

  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const handleLogin = async () => {
    if (hasErrorEmail()) {
      setIsEmailError(true);
    } else {
      if (hasErrorPassword()) {
        setIsPasswordError(true);
        setIsEmailError(false);
      } else {
        setIsPasswordError(false);
        setIsEmailError(false);
        const encodedData = encode(`${email}:${password}`);
        const headers = {auth: `Basic ${encodedData}`};
        let result = null;
        try {
          setIsLoading(true);
          result = await login(headers);
          if (result.status >= 200) {
            const token = result.headers.getAuthorization();
            await saveStringItem(PhoneStorage.jwt, token);
            let decodedToken = token.slice(7);
            decodedToken = jwtDecode(token);
            dispatch(
              logInUser({
                id: decodedToken.userId,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                email: decodedToken.email,
                roleId: decodedToken.roleId,
              }),
            );
            navigation.replace('Transactions');
          }
        } catch (error) {
          console.error(`Error logging in ${error}`);
          setVisibleSnackBar(true);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.login__loading}>
          <ActivityIndicator size={'large'} animating={true} />
        </View>
      ) : (
        <View style={globalStyle.screen_container}>
          <ScrollView style={globalStyle.scroll}>
            <View style={styles.login__container}>
              <View style={styles.login__form}>
                <View style={styles.login__formContainer}>
                  <TextInput
                    style={{backgroundColor: theme.colors.surface}}
                    label="Email"
                    value={email}
                    onChangeText={newText => setEmail(newText)}
                    left={<TextInput.Icon icon="email" />}
                  />
                  <HelperText
                    type="error"
                    visible={isEmailError}
                    style={globalStyle.helperText}>
                    Email address is invalid
                  </HelperText>
                  <TextInput
                    style={{backgroundColor: theme.colors.surface}}
                    label="Password"
                    value={password}
                    onChangeText={newText => setPassword(newText)}
                    secureTextEntry={isSecurityEnble}
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon="eye"
                        onPress={() =>
                          setIsSecurityEnable(prevState => !prevState)
                        }
                      />
                    }
                  />
                  <HelperText
                    type="error"
                    visible={isPasswordError}
                    style={globalStyle.helperText}>
                    Password is invalid
                  </HelperText>
                  <Button
                    mode="contained"
                    onPress={handleLogin}
                    labelStyle={styles.login__buttonLabel}>
                    Login
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
          <Snackbar
            visible={visibleSnackBar}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Close',
              textColor: theme.colors.primary,
            }}>
            Email or password are incorrect.
          </Snackbar>
        </View>
      )}
    </>
  );
}
