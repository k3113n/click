import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import Toggle from './components/Toggle';
import BackButton from './components/BackButton';

const Settings = (props) => {
    return (
        <>
            <BackButton navHandler={props.backHandler}/>
            <View style={styles.center}>
                <Text style={[styles.rowText, styles.header]}>Settings</Text>
                <View style={styles.row}>
                    <View style={styles.rowLabel}>
                        <Toggle value={props.cap} toggleHandler={props.keycapHandler} />     
                        <Text style={styles.rowText}>Keycap</Text>     
                    </View>     
                    <Pressable
                        disabled={!props.cap}
                        onPress={props.bgHandler}>
                        <FontAwesomeIcon icon={faPalette} color={props.cap ? 'burlywood' : 'lightgray'} size={32}/>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowLabel}>
                        <Toggle disabled={true} value={null} toggleHandler={null} />     
                        <Text style={styles.rowText}>Text Color</Text>
                    </View>
                    <Pressable
                        disabled={!props.cap}
                        onPress={props.txtHandler}>
                        <FontAwesomeIcon icon={faPalette} color={props.cap ? 'burlywood' : 'lightgray'} size={32}/>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowLabel}>
                        <Toggle value={props.led} toggleHandler={props.ledHandler} />           
                        <Text style={styles.rowText}>LED</Text>
                    </View>
                    <Pressable
                        disabled={!props.led}
                        onPress={props.rgbHandler}>
                        <FontAwesomeIcon icon={faPalette} color={props.led ? 'burlywood' : 'lightgray'} size={32}/>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowLabel}>
                        <Toggle value={props.haptics} toggleHandler={props.hapticsHandler} />     
                        <Text style={styles.rowText}>Haptic Feedback</Text>
                    </View>
                </View>
            </View>
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
  center: {
    width: "100%",
    height: "90%",
    marginTop: "10%",
    alignContent: 'center',
    justifyContent: 'center'
  },
  header: {
    alignSelf: 'center', 
    marginBottom: 5,
    fontSize: 20
  },
});

export default Settings;
