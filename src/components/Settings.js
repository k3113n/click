import React, { cloneElement, useState } from 'react';
import {Text, View, Pressable, Switch, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from 'reanimated-color-picker';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeycap } from '../state/KeycapToggleSlice';
import { setKeycapBgColor } from '../state/KeycapBgColorSlice';
import { setKeycapTxtColor } from '../state/KeycapTxtColorSlice';
import { toggleLed } from '../state/LedToggleSlice';
import { setLedColor } from '../state/LedColorSlice';
import { toggleHaptics } from '../state/HapticsToggleSlice';

const Toggle = (props) => {
    return (
        <Switch
        disabled={props.disabled}
        style={{opacity: props.disabled ? 0 : 1 }}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.handler}
        value={props.value}
        />   
    );
}

const Main = (props) => {
    const dispatch = useDispatch();
    const keycap = useSelector((state) => state.keycap.value);
    const led = useSelector((state) => state.led.value);
    const haptics = useSelector((state) => state.haptics.value)

    const handleKeycapToggle = () => {
      dispatch(toggleKeycap());
    }

    const handleLedToggle = () => {
        dispatch(toggleLed());
    }
    
    const handleHapticsToggle = () => {
        dispatch(toggleHaptics());
    }

    return (
        <>
          <Text style={[styles.rowText, styles.header]}>Settings</Text>
          <View style={styles.row}>
            <View style={styles.rowLabel}>
                <Toggle value={keycap} handler={handleKeycapToggle} />     
                <Text style={styles.rowText}>Keycap</Text>     
            </View>     
            <Pressable
              disabled={!keycap}
              onPress={() => props.navHandler('bgColor')}>
              <FontAwesomeIcon icon={faPalette} color={keycap ? 'burlywood' : 'lightgray'} size={32}/>
            </Pressable>
          </View>
          <View style={styles.row}>
            <View style={styles.rowLabel}>
                <Toggle disabled={true} value={null} handler={null} />     
                <Text style={styles.rowText}>Text Color</Text>
            </View>
            <Pressable
              disabled={!keycap}
              onPress={() => props.navHandler('txtColor')}>
              <FontAwesomeIcon icon={faPalette} color={keycap ? 'burlywood' : 'lightgray'} size={32}/>
            </Pressable>
          </View>
          <View style={styles.row}>
            <View style={styles.rowLabel}>
                <Toggle value={led} handler={handleLedToggle} />           
                <Text style={styles.rowText}>LED</Text>
            </View>
            <Pressable
              disabled={!led}
              onPress={() => props.navHandler('ledColor')}>
              <FontAwesomeIcon icon={faPalette} color={led ? 'burlywood' : 'lightgray'} size={32}/>
            </Pressable>
          </View>
          <View style={styles.row}>
            <View style={styles.rowLabel}>
                <Toggle value={haptics} handler={handleHapticsToggle} />     
                <Text style={styles.rowText}>Haptic Feedback</Text>
            </View>
          </View>
        </>
    );
}

const PersistantColorPicker = (props) => {
    return (
        <ColorPicker 
            value={props.color} 
            onComplete={props.handler}
        >
          <Preview />
          <Panel1 />
          <HueSlider />
        </ColorPicker>
    );
}

const BgColor = (props) => {
    const dispatch = useDispatch();
    const bg = useSelector((state) => state.bg.value);

    const handleKeycapBgColor = (value) => {
        dispatch(setKeycapBgColor(value.hex));
    }

    return (
        <View style={styles.center}>
            <PersistantColorPicker color={bg} handler={handleKeycapBgColor} />
        </View>
    )
}

const TxtColor = (props) => {
    const dispatch = useDispatch();
    const txt = useSelector((state) => state.txt.value);

    const handleKeycapTxtColor = (value) => {
        dispatch(setKeycapTxtColor(value.hex));
    }

    return (
        <View style={styles.center}>
            <PersistantColorPicker color={txt} handler={handleKeycapTxtColor} />
        </View>
    )
}

const LedColor = (props) => {
    const dispatch = useDispatch();
    const rgb = useSelector((state) => state.rgb.value);

    const handleLedColor = (value) => {
        dispatch(setLedColor(value.hex));
    }

    return (
        <View style={styles.center}>
            <PersistantColorPicker color={rgb} handler={handleLedColor} />
        </View>
    )
}

const BackButton = (props) => {
    return (
        <Pressable onPress={() => props.navHandler()}>
            <View style={styles.back}>
                <FontAwesomeIcon icon={faArrowLeft} color={"lightgray"} size={18} />
            </View>
        </Pressable>
    );
}

export default function Settings() {  
    const [activeScreen, setActiveScreen] = useState('main'); 

    const renderNavigation = () => {
        switch (activeScreen){
            case 'bgColor':
                return (<BgColor />);
            case 'txtColor':
                return (<TxtColor />);
            case 'ledColor':
                return (<LedColor />);
            default:
                return (<Main navHandler={(value) => setActiveScreen(value)} />);
        }
    }
    
    return (
        <>
        {activeScreen !== 'main' ? <BackButton navHandler={() => setActiveScreen('main')} /> : <></>}
        <ScrollView style={styles.scrollview}>
            {renderNavigation()}
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: "5%"
  },
  rowText: {
    color: 'lightgray',
    fontSize: 18,
    paddingHorizontal: "5%"
  },
  rowLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollview: {
    width: "100%",
    height: "100%",
  },
  header: {
    alignSelf: 'center', 
    marginBottom: 5,
    fontSize: 20
  },
  back: {
    position: 'absolute',
    top: -13,
    left: "-55%",
    minHeight: "5%",
    minWidth: "5%",
  },
  center: {
    paddingTop: "10%",
    alignContent: 'center',
    justifyContent: 'center'
  }
});

