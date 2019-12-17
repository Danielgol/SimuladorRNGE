
import React, { Component } from "react";
import { View, Image } from "react-native";

export default class Cell extends Component {
    render() {

        const width = this.props.width;
        const height = this.props.height;
        const x = this.props.position[0];
        const y = this.props.position[1];
        const opacityOx = this.props.opacityOx;
        const opacityDb = this.props.opacityDb;
        const show = this.props.show;

        if(show === 1){
            return (
                <Image source={require('../images/oxigen.png')}
                    style={{
                        zIndex: 0,
                        position: "absolute",
                        left: x,
                        top: y,
                        width: width,
                        height: height,
                        opacity: opacityOx,
                        height: height,
                    }}
                />
            );
        }else{
            return (
                <Image source={require('../images/decibels.png')}
                    style={{
                        zIndex: 0,
                        position: "absolute",
                        left: x,
                        top: y,
                        width: width,
                        height: height,
                        opacity: opacityDb,
                        height: height,
                    }}
                />
            );
        }
        
    }
}
