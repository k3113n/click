import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/state/store';
import ClickScreen from './src/ClickScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ClickScreen />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};
export default App;