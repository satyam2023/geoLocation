import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeViewModel from '../viewModel/HomeViewModel';
import {SCREENS} from '../config/constants/Screen';
import {StringConstant} from '../config/constants/StringConstant';

type RootStackParamList = {
  [SCREENS.HOME]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.HOME}
          component={HomeViewModel}
          options={{
            title: StringConstant.GEO_POC,
            headerTitleStyle: {
              fontWeight: '800', 
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
