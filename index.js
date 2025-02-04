/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { enGB, registerTranslation } from 'react-native-paper-dates';

registerTranslation('en-GB', {
    ...enGB,
    save: 'Save',
    cancel: 'Cancel',
    ok: 'OK',
  });

AppRegistry.registerComponent(appName, () => App);
