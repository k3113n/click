import React from "react";
import { Switch, StyleSheet, Platform } from 'react-native';

const Toggle = (props) => {
    return (
        <Switch
            accessibilityLabel={props.label}
            disabled={props.disabled}
            style={[styles.switch, {opacity: props.disabled ? 0 : 1, top: Platform.OS === 'ios' ? "3.3%" : 0 }]}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            onValueChange={props.toggleHandler}
            value={props.value} />   
    );
}

const styles = StyleSheet.create({
    switch: {
        height: 48,
        width: 48,
    }
});

export default Toggle;