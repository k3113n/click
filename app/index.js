import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/state/store';
import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useRef, useCallback} from 'react';
import {Text, View, ScrollView, SafeAreaView, Image, Modal, Pressable, Switch, StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { useDispatch, useSelector } from 'react-redux';
import { set } from './state/CountSlice';
import * as SplashScreen from 'expo-splash-screen';
import Service from './helpers/Connect';
import Clicker from './components/Clicker';
import Settings from '../settings';

SplashScreen.preventAutoHideAsync();

const fetchFonts = async () => await Font.loadAsync({
  'Noto-mono': require('../assets/fonts/mono.ttf'),
});

export function ClickScreen() {
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState(false);

  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.value);
  const keycap = useSelector((state) => state.keycap.value);
  const bg = useSelector((state) => state.bg.value);
  const txt = useSelector((state) => state.txt.value);
  const led = useSelector((state) => state.led.value);
  const rgb = useSelector((state) => state.rgb.value);
  const haptics = useSelector((state) => state.haptics.value);

  const update = (value) => {
    if(value > count) {
      dispatch(set(value));
    }
  }

  const click = () => {
    const value = count + 1;
    update(value);
    ws.current.send(value.toString());
  }

  const multiline = (n) => {
    let array = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(",");
    let res = array.join("\n");
    return res;
  }

  const ws = useRef(new Service());

  useEffect(() => {
    const socket = new Service('wss://greater.nellek.com', update);
    ws.current = socket;
    async function prepare(){
      try {
        await Font.loadAsync({
          'Noto-mono': require('../assets/fonts/mono.ttf'),
        });         
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if(!loaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={[styles.safe, {backgroundColor: "#363636"}]}>
      <View style={[styles.container]}>
        <View style={[styles.top]}>
          <Text
            adjustsFontSizeToFit
            style={styles.numbers}>
            {multiline(count)}
          </Text>
          <Pressable
            style={[styles.settingsOpen]}
            onPress={() => setSettings(true)}>
            <FontAwesomeIcon icon={faGear} color={'gray'} size={32}/>
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={settings}
            onRequestClose={() => {
              setSettings(!settings);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.settingsClose]}
                  onPress={() => setSettings(!settings)}>
                </Pressable>
                <Settings />
             </View>
            </View>
          </Modal>
        </View>
        <View style={[styles.bottom]}>
          <View style={styles.plate}>
            <Clicker handler={() => click()} cap={keycap} bg={bg} fg={txt} led={led} rgb={rgb} haptics={haptics}/>
            <Image
              style={styles.switch}
              source={haptics ? require('../assets/blue.png') : require('../assets/red.png')}
            />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: "5%",
    width: "100%"
  },
  bottom: {
    alignContent: 'center',
    height: "30%",
  },
  top: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    width: "90%",
    height: "90%"
  },
  game: {
  },
  numbers: {
    color: "gray",
    textAlign: "center",
    fontSize: 160,
    fontFamily: "Noto-mono"
  },
  plate: {
    width: "100%",
    height: "10%",
    minWidth: 95,
    minHeight: 100,
    alignItems: 'center',
  },
  switch: {
      width: "100%",
      height: "100%",
      minWidth: 95,
      minHeight: 100,
      resizeMode: "contain",
      zIndex: -2,
      bottom: "104%",
  },
  settingsOpen: {
    position: 'absolute',
    top: "5%",
    right: 0
  }
});

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