import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import BackgroundGeolocation from 'react-native-background-geolocation';
import Routes from './src/routes';
import {StringConstant} from './src/config/constants/StringConstant';

Geocoder.init(StringConstant.GOOGLE_API_KEY, {language: 'en'});

function App(): React.JSX.Element {
  useEffect(() => {
    BackgroundGeolocation.onLocation(location => {
      console.log('onLocation:', location);
    });

    BackgroundGeolocation.onMotionChange(event => {
      console.log('onMotionChange:', event);
    });

    BackgroundGeolocation.onActivityChange(event => {
      console.log('onActivityChange:', event);
    });

    BackgroundGeolocation.watchPosition(location=>{
      console.log('Location:', location);
    })

    BackgroundGeolocation.onProviderChange(event => {
      console.log('onProviderChange:', event);
    });
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 50,
      enableHeadless: true,
      stopOnTerminate: false,
      startOnBoot: true,
      debug: true,
    })
      .then(state => {
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
      })
      .catch(error => {
        console.warn('- BackgroundGeolocation error: ', error);
      });
  }, []);

  const checkback = async () => {
    BackgroundGeolocation.getLocations(point => {
      console.log('points in background', point);
    });
  };

  useEffect(() => {
    async function checkPermissions() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: StringConstant.LOC_PERM,
              message: StringConstant.NEED_LOCATION_ACCESS,
              buttonNeutral: StringConstant.ASK_LATER,
              buttonNegative: StringConstant.CNL,
              buttonPositive: StringConstant.OK,
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    checkPermissions();
    setTimeout(() => checkback(), 20000);
  }, []);

  return <Routes />;
}

export default App;
