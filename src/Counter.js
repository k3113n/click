import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';

const Counter = (props) => {
    const multiline = (n) => {
        let array = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(",");
        let res = array.join("\n");
        return res;
    }

    return (
        <>
            <Pressable 
              style={styles.settingsOpen}
              accessibilityLabel='Open Settings'
              onPress={props.navHandler}>
                <FontAwesomeIcon icon={faGear} color={'gray'} size={32}/>
            </Pressable>
            <Text
                adjustsFontSizeToFit
                style={styles.numbers}>
                {multiline(props.count)}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
  numbers: {
    color: "gray",
    textAlign: "center",
    fontSize: 160,
    fontFamily: "Noto-mono"
  },
  settingsOpen: {
    position: 'absolute',
    right: 0,
    top: '2.5%',
    padding: 8,
  }
});

export default Counter;