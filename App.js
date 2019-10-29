
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

var taleWidth = 36;
var taleHeight = 64;

var fps = 0;


const SimulatorLoop = (entities) => {
    fetch("http://4fb39938.ngrok.io/robot")
      .then(response => response.json())
      .then((responseJson) => {
          var data = responseJson;
          
          entities[0].position[0] = data.robo_x;
          entities[0].position[1] = data.robo_y;

          for(var i=1; i<101; i++){
              if(entities[i].position[0] === data.tile_x*36 && entities[i].position[1] === data.tile_y*64){
                  entities[i].opacity = data.oxLevel;
              }
          }

          /*

          if(entities[1][y_robot][Math.floor(data.robo_x)] === 1){
            Tile[y_robot][Math.floor(data.robo_x)] = 0;
            opacity = (Math.random()*100)/100;
          }
          */

          /*
          if(data.oxLevel !== 0){
              entities[numEntities++] = {
                  position: [ entities[0].position[0], entities[0].position[1] ],
                  size: boxSize,
                  opacity: data.oxLevel,
                  renderer: Circle
              }
          }
          */
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
      fetch("http://4fb39938.ngrok.io/robot")
      .then(response => response.json())
      .then((responseJson) => {
          this.setState({
              isloading: false,
          })

          var data = responseJson;
          numEntities = 0;

          this.state.entities[0] = {
              position: [data.robo_x, data.robo_y],
              size: boxSize,
              renderer: Box
          }

          var cells = 1;
          for(var i=0; i<10; i++){
              for(var x=0; x<10; x++){
                  this.state.entities[cells] = {
                      position: [ i*taleWidth , x*taleHeight ],
                      opacity: 0,
                      size: 50,
                      renderer: Circle
                  }
                  cells++;
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