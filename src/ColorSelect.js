import React from 'react';
import { View, StyleSheet } from 'react-native';
import PersistentColorPicker from './components/PersistentColorPicker';
import BackButton from './components/BackButton';

const ColorSelect = (props) => {
    const handleColor = (value) => {
        props.colorHandler(value.hex);
    }

    return (
        <>
            <BackButton navHandler={props.navHandler} />
            <View style={styles.center}>
                <PersistentColorPicker color={props.color} handler={handleColor} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    center: {
      marginTop: "10%",
      height: '90%',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center'
    }
});
  
export default ColorSelect;