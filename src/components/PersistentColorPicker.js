import React from "react";
import ColorPicker, { Panel1, Preview, HueSlider } from 'reanimated-color-picker';

const PersistentColorPicker = (props) => {
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

export default PersistentColorPicker;