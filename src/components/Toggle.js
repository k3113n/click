import React from "react";
import { Switch } from 'react-native';

const Toggle = (props) => {
    return (
        <Switch
            disabled={props.disabled}
            style={{opacity: props.disabled ? 0 : 1 }}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={props.toggleHandler}
            value={props.value} />   
    );
}

export default Toggle;