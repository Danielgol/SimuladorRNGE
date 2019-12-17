
import React, { Component } from "react";
import { View, Image } from "react-native";
//import { array, object, string } from 'prop-types';

export default class Border extends Component {
  render() {

    return (
      <Image source={require('../images/border.png')}
        style={{
          flex: 1,
        	height: '100%',
        	width: '100%',
        	resizeMode: 'stretch'
        }}/>
    );
    
  }
}

//Border.propTypes = {}