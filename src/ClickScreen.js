import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { set } from './state/CountSlice';
import { toggleKeycap } from './state/KeycapToggleSlice';
import { setKeycapBgColor } from './state/KeycapBgColorSlice';
import { setKeycapTxtColor } from './state/KeycapTxtColorSlice';
import { toggleLed } from './state/LedToggleSlice';
import { setLedColor } from './state/LedColorSlice';
import { toggleHaptics } from './state/HapticsToggleSlice';
import Service from './helpers/Connect';
import { preloadAudio } from './helpers/Audio';
import Clicker from './components/Clicker';
import Settings from './Settings';
import Counter from './Counter';
import ColorSelect from './ColorSelect';

SplashScreen.preventAutoHideAsync();

const ClickScreen = () => {
    const [loaded, setLoaded] = useState(false);
    const [screen, setScreen] = useState('counter'); 

    const dispatch = useDispatch();
    const count = useSelector(state => state.count.value);
    const keycap = useSelector(state => state.keycap.value);
    const bg = useSelector(state => state.bg.value);
    const txt = useSelector(state => state.txt.value);
    const led = useSelector(state => state.led.value);
    const rgb = useSelector(state => state.rgb.value);
    const haptics = useSelector(state => state.haptics.value);

    const update = (value) => {
        if(value > count) {
            dispatch(set(value));
        }
    }

    const click = () => {
        const value = count + 1;
        update(value);
       // ws.current.send(value.toString());
    }

    //const ws = useRef(new Service());

    useEffect(() => {
       // const socket = new Service('wss://greater.nellek.com', update);
       // ws.current = socket;
        async function prepare(){
        try {
            await Font.loadAsync({
            'Noto-mono': require('../assets/fonts/mono.ttf'),
            'Roboto': require('../assets/fonts/roboto.ttf')
            });
            preloadAudio();         
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

    const renderNavigation = () => {
        switch (screen){
            case 'bgColor':
                return (<ColorSelect 
                            color={bg} 
                            colorHandler={(value) => dispatch(setKeycapBgColor(value))} 
                            navHandler={() => setScreen('settings')} />);
            case 'txtColor':
                return (<ColorSelect 
                            color={txt} 
                            colorHandler={(value) => dispatch(setKeycapTxtColor(value))} 
                            navHandler={() => setScreen('settings')} />);
            case 'rgbColor':
                return (<ColorSelect 
                            color={rgb} 
                            colorHandler={(value) => dispatch(setLedColor(value))} 
                            navHandler={() => setScreen('settings')} />);
            case 'settings':
                return (<Settings 
                            cap={keycap}
                            led={led} 
                            haptics={haptics}
                            keycapHandler={() => dispatch(toggleKeycap())} 
                            ledHandler={() => dispatch(toggleLed())}
                            hapticsHandler={() => dispatch(toggleHaptics())}
                            bgHandler={() => setScreen('bgColor')}
                            txtHandler={() => setScreen('txtColor')}
                            rgbHandler={() => {setScreen('rgbColor')}}
                            backHandler={() => setScreen('counter')} />);
            default:
                return (<Counter 
                            count={count}
                            navHandler={() => setScreen('settings')} />);
        }
    }

    return (
        <SafeAreaView onLayout={onLayoutRootView} style={[styles.safe]}>
            <View style={[styles.container]}>
                <View style={[styles.top]}>
                    {renderNavigation()}
                </View>
                <View style={[styles.bottom]}>
                    <View style={styles.plate}>
                    <Clicker 
                        handler={() => click()} 
                        cap={keycap}
                        bg={bg} 
                        fg={txt} 
                        led={led} 
                        rgb={rgb} 
                        haptics={haptics}/>
                    <Image
                        style={styles.switch}
                        source={haptics ? require('../assets/blue.png') : require('../assets/red.png')} />
                    </View>
                </View>
            </View>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363636',
    paddingTop: 10
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
    height: "70%"
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
});

export default ClickScreen;