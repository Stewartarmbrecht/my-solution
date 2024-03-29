import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'core-js/full/symbol/async-iterator';

import { registerRootComponent } from 'expo';

import App from './app/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
