import React from "react";
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';

const PersistentColorPicker = (props) => {
    return (
        <ColorPicker 
            value={props.color} 
            onComplete={props.handler}>
            <Panel1 style={{height: "80%"}}/>
            <HueSlider />
        </ColorPicker>
    );
}

export default PersistentColorPicker;