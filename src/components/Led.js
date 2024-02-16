import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Defs, Stop, Svg, Circle, RadialGradient, Path } from 'react-native-svg'

const Led = (props) => {
  return (
        <Svg style={[props.ss, {position: 'absolute'}]}>
            <Path
                d="M0 0H375V279C375 283.418 371.418 287 367 287H8C3.58172 287 0 283.418 0 279V0Z"
                fill="url(#grad)"
            />
            <Circle 
                cx="51.5"
                cy="32"
                r="10"
                fill={props.color}
            />
            <Defs>
                <RadialGradient
                id="grad"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(52.5 36) rotate(90) scale(38 45)"
                >
                <Stop stopColor={props.color} stopOpacity={1} />
                <Stop stopColor={props.color} stopOpacity={0} offset={1} />
                </RadialGradient>
            </Defs>
        </Svg>
  )
}

export default Led;