import {GeolocationResponse} from '@react-native-community/geolocation';
import {IBaseReducerInterface} from './IBaseReducer';
import {SET_USER_LOCATION} from '../ActionConstant';

const INITIAL_STATE = {
  data: {},
};

interface ILocationReducer {
  data: GeolocationResponse;
}

const locationReducer = (
  state = INITIAL_STATE,
  action: IBaseReducerInterface<ILocationReducer>,
) => {
  switch (action.type) {
    case SET_USER_LOCATION: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
export default locationReducer;
