/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundGeolocation from 'react-native-background-geolocation';

const BackgroundGeolocationHeadlessTask = async (event) => {
    let params = event.params;
     console.log("[BackgroundGeolocation HeadlessTask] -", event.name, params);
}

BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
