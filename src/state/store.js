import { configureStore } from '@reduxjs/toolkit';
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
  whitelist: ['count', 'keycap', 'bg', 'txt', 'led', 'rgb', 'haptics']
};

const persistedCountReducer = persistReducer(persistConfig, CountReducer);
const persistedKeycapReducer = persistReducer(persistConfig, KeycapReducer);
const persistedBgColorReducer = persistReducer(persistConfig, KeycapBgColorReducer);
const persistedTxtColorReducer = persistReducer(persistConfig, KeycapTxtColorReducer);
const persistedLedReducer = persistReducer(persistConfig, LedReducer);
const persistedLedColorReducer = persistReducer(persistConfig, LedColorReducer);
const persistedHapticsReducer = persistReducer(persistConfig, HapticsToggleReducer);

export const store = configureStore({
  reducer: {
    count: persistedCountReducer,
    keycap: persistedKeycapReducer,
    bg: persistedBgColorReducer,
    txt: persistedTxtColorReducer,
    led: persistedLedReducer,
    rgb: persistedLedColorReducer,
    haptics: persistedHapticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false 
    }),
});

export const persistor = persistStore(store);