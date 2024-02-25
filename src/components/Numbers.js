import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Number = (props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            props.destroy(props.id);
        }, props.duration);
        return () => clearTimeout(timer);
    }, [props.id, props.duration, props.destroy]);

    return (
        visible ?
        <View style={styles.number}>
            <Text>+1</Text>
        </View>
        : null
    );
}

const styles = StyleSheet.create({
    number: {
        zIndex: 4,
        position: 'absolute'
    }
});

export default Number;