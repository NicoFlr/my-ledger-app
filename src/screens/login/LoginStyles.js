import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  login__container: {
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  login__form: {
    marginTop: -20,
  },
  login__formContainer: {
    marginTop: 12,
    width: '100%',
    gap: 4,
  },
  login__button: {
    width: '100%',
  },
  login__buttonLabel: {
    fontSize: 16,
  },
  login__infoLabel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#ccc',
    marginTop: 12,
  },
  login__loading: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login__snackBar: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
