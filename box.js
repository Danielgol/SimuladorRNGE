
import React, { Component } from "react";
import { View, Image } from "react-native";
//import { array, object, string } from 'prop-types';

export default class Box extends Component {
  render() {

    const width = this.props.size;
    const height = this.props.size;
    const x = this.props.position[0];
    const y = this.props.position[1];

    return (
        <Image source={require('./image.png')}
            style={{
                zIndex: 1,
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: 'black'
            }}
        />
    );
    
  }
}

/*
Box.propTypes = {
    size: number,
    position: array
}
*/