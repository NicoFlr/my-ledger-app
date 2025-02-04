import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  transaction__container: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1,
  },
  transaction__form: {
    marginTop: -20,
  },
  transaction__formContainer: {
    marginTop: 12,
    width: '100%',
    gap: 4,
  },
  transaction__button: {
    width: '100%',
  },
  transaction__buttonLabel: {
    fontSize: 16,
  },
  transaction__infoLabel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#ccc',
    marginTop: 12,
  },
  transaction__loading: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transaction__snackBar: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default styles;
