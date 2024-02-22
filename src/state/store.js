import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountReducer from './CountSlice';
import KeycapReducer from './KeycapToggleSlice';
import KeycapBgColorReducer from './KeycapBgColorSlice';
import KeycapTxtColorReducer from './KeycapTxtColorSlice';
import LedReducer from './LedToggleSlice';
import LedColorReducer from './LedColorSlice';
import HapticsToggleReducer from './HapticsToggleSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'count', 
    'keycap', 
    'bg', 
    'txt', 
    'led', 
    'rgb', 
    'haptics'
  ]
};

const rootReducer = combineReducers({
  count: CountReducer,
  keycap: KeycapReducer,
  bg: KeycapBgColorReducer,
  txt: KeycapTxtColorReducer,
  led: LedReducer,
  rgb: LedColorReducer,
  haptics: HapticsToggleReducer
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false 
    }),
});

export const persistor = persistStore(store);