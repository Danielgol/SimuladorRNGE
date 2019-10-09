
import React, { Component } from "react";
import { View, Image } from "react-native";

export default class Box extends Component {
  render() {

    const width = this.props.size;
    const height = this.props.size;
    const x = this.props.position[0];
    const y = this.props.position[1];
    const opacity = this.props.opacity;

    return (
        <Image source={require('./red_circle.png')}
            style={{
                zIndex: 0,
                position: "absolute",
                left: x,
                top: y,
                width: width,
                opacity: opacity,
                height: height,
            }}
        />
    );
    
  }
}
