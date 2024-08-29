import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  Action,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {thunk} from 'redux-thunk';
import locationReducer from './reducer/SetLocationReducer';

const middleware = applyMiddleware(thunk);

const reducers = combineReducers({
  location:locationReducer
});

const rootReducer = (state: RootState, action:any) => {
  return reducers(state, action);
};

const persistConfig = {
  key: '@cabbooking',
  storage: AsyncStorage,
  whitelist: [],
};

const presistedReducer = persistReducer(persistConfig, rootReducer);
const globalStore = createStore(presistedReducer, middleware);
const persistor = persistStore(globalStore);
export type RootState = ReturnType<typeof reducers>;
export type GlobalRootState = ReturnType<typeof reducers>;

export {persistor, globalStore};
