import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Animated, StyleSheet } from 'react-native';
import { Sounds } from '../helpers/Audio';
import * as Haptics from 'expo-haptics';
import Led from './Led';

const getStyle = (cap = true, color, text, led = false, rgb) => {
    return StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: "15%",
            height: "10%",
            minWidth: 95,
            minHeight: 100,
            borderRadius: 10,
            backgroundColor: cap ? color : "rgba(0,0,0,0)",
            borderColor: led ? rgb : "rgba(0,0,0,0)",
            borderBottomWidth: cap ? 1 : 0,
            zIndex: 2
        },
        button: {
            minWidth: cap ? 95 : 70,
            minHeight: cap ? 100 : 70,
            top: 0,
            borderRadius: 10,
            backgroundColor: cap ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.1)",
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 10,
            borderTopWidth: 5,
            borderBottomWidth: 20,
            borderLeftColor: "rgba(0,0,0,0.15)",
            borderTopColor: "rgba(0,0,0,0.05)",
            borderRightColor: "rgba(0,0,0,0.15)",
            borderBottomColor: "rgba(0,0,0,0.25)",
            zIndex: 2
        },
        buttonText: {
            opacity: cap ? 1 : 0,
            color: text,
            fontSize: 22,
            fontFamily: 'Roboto'
        },
        led: {
            height: "100%",
            width: "100%",
            zIndex: -1,
            bottom: "-38%",
            left: cap ? "-5%" : 0
        }
    });
}

const Clicker = (props) => {
    const [scale, setScale] = useState(1);
    const name = props.haptics ? 'blue' : 'red';

    const style = getStyle(props.cap, props.bg, props.fg, props.led, props.rgb);

    const pressIn = async () => {
        props.handler();
        setScale(0.95);
        Sounds[name+'Down'].replayAsync();
        if(props.haptics){
            Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Heavy
            )
        }
    };

    const pressOut = async () => {
        setScale(1);
        Sounds[name+'Up'].replayAsync();
        if(props.haptics){
            Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Heavy
            )
        }
    };

    return  (
        <View style={[{ padding: "1%", paddingTop: 0}]}>
            <Animated.View style={[{transform: [{scale: scale}]}]}>
                <View style={style.container}>
                    <Pressable onPressIn={ pressIn } onPressOut={ pressOut }>
                        <View style={[style.button, ]}>
                            <Text style={style.buttonText}>
                                +1
                            </Text>
                        </View>
                </Pressable>
                </View>
                { props.led && props.cap && scale === 1 ? <Led color={props.rgb} ss={style.led} /> : <></> }
            </Animated.View>
            { props.led && !props.cap ? <Led color={props.rgb} ss={style.led} /> : <></> }
        </View>
    );
};

export default Clicker;