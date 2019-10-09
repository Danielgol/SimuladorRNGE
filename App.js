
import { GameEngine } from "react-native-game-engine";
import { AppRegistry , View , StyleSheet, Dimensions ,
         ActivityIndicator , YellowBox , Image } from 'react-native';
import React, { Component } from 'react';

import Box from './box';
import Border from './border';
import Circle from './circle';


const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.055);

var numEntities = 0;


const SimulatorLoop = (entities) => {
    fetch("http://10.0.0.114:3000/")
      .then(response => response.json())
      .then((responseJson) => {
          var data = responseJson;
          entities[0].position[0] = data.x;
          entities[0].position[1] = data.y;

          if(data.opacity !== 0){
              entities[numEntities++] = {
                  position: [ entities[0].position[0], entities[0].position[1] ],
                  size: boxSize,
                  opacity: data.opacity,
                  renderer: Circle
              }
          }
    });
    return entities;
}



export default class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          isloading: true,
          entities: []
      };
  }

  componentDidMount(){
      fetch("http://10.0.0.114:3000/", {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              width: width-boxSize,
              height: height-boxSize,
          }),
      })
      .then(response => response.json())
      .then((responseJson) => {
          this.setState({
              isloading: false,
          })

          var data = responseJson;
          numEntities = 0;

          for(var i=0; i<data.quant; i++){
              this.state.entities[numEntities++] = {
                  position: [data.x, data.y],
                  size: boxSize,
                  renderer: Box
              }
          }
      });
  }

  render(){
      if(this.state.isloading){
          return (
              <View>
                <ActivityIndicator/>
              </View>//
          );
      } else {    
          return (
              <View>
                  <Image source={require('./border.png')}
                  style={{width: '100%', height: '100%', resizeMode: 'stretch'}}/>
                  <GameEngine
                      style={{position: 'absolute', left: 0, top: 0}}
                      entities={this.state.entities}
                      systems={[SimulatorLoop]}
                  />
              </View>
              
          );
      }
  }

}

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);