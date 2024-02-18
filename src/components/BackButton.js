import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

const BackButton = (props) => {
    return (
        <Pressable
            onPress={() => props.navHandler()}>
            <View style={styles.back}>
                <FontAwesomeIcon icon={faArrowLeft} color={"gray"} size={32} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    back: {
        padding: 8,
        position: 'absolute',
        top: '2.5%',
        left: 0
    },
});

export default BackButton;