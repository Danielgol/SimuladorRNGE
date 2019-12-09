
import { GameEngine } from "react-native-game-engine";
import { AppRegistry , View , StyleSheet, Dimensions ,
         ActivityIndicator , YellowBox , Image , TextInput ,
         Button , StatusBar , Text } from 'react-native';
import React, { Component } from 'react';

import Robot from './robot';
import Cell from './cell';


const url = "http://10.0.0.109:8060/robot";
const { width, height } = Dimensions.get("screen");

var pool_width = 360;
var pool_height = 640;
var x_cells = 10;
var y_cells = 10;
var numCells = x_cells*y_cells;
var taleWidth = width/x_cells;
var taleHeight = height/y_cells;

const boxSize = Math.trunc(Math.max(width, height) * 0.055);

var show = 1;



export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            menu: true,
            isLoading: true,
            entities: []
        };
    }

    componentDidMount(){
        StatusBar.setHidden(true);
    }

    start = () => {
        this.state.entities[0] = {
            position: [-50, -50],
            size: boxSize,
            renderer: Robot
        }
        var cells = 1;
        for(var i=0; i<x_cells; i++){
            for(var x=0; x<y_cells; x++){
                this.state.entities[cells] = {
                    position: [ i*taleWidth , x*taleHeight ],
                    opacityOx: 0,
                    opacityDb: 0,
                    show: 1,
                    width: taleWidth,
                    height: taleHeight,
                    renderer: Cell
                }
                cells++;
            }
        }
        this.setState({menu: false})
    }

    changeView = () => {
        if (show === 1){
            show = 2;
        } else {
            show = 1;
        }
    }

    simulatorLoop = (entities) => {
        fetch(url).then(response => response.json()).then((responseJson) => {
            this.setState({isLoading: false});

            var data = responseJson;
              
            entities[0].position[0] = (data.robo_x - boxSize/2) * (width/pool_width);
            entities[0].position[1] = (data.robo_y - boxSize/2) * (height/pool_height);

            entities[((data.tile_x*x_cells)+data.tile_y)+1].opacityOx = data.oxLevel;
            entities[((data.tile_x*x_cells)+data.tile_y)+1].opacityDb = data.oxLevel;
        }).catch((error) => {
            this.setState({isLoading: true});
        });
        for(var i=1; i<numCells+1; i++){
            entities[i].show = show;
        }
        return entities;
    }

    render(){

        if(this.state.menu){
            return (
                <View style={{alignItems: 'center'}}>
                    <TextInput
                        style={{ position: 'absolute', top: 150, width: 100}}
                        placeholder="Pool's Width"
                        //underlineColorAndroid='transparent'
                        keyboardType={'numeric'}  
                    />
                    <TextInput
                        style={{ position: 'absolute', top: 200, width: 100}}
                        placeholder="Pool's Height"
                        keyboardType={'numeric'}  
                    />
                    <TextInput
                        style={{ position: 'absolute', top: 250, width: 100}}
                        placeholder="Columns"  
                        keyboardType={'numeric'}  
                    />
                    <TextInput
                        style={{ position: 'absolute', top: 300, width: 100}}
                        placeholder="Rows"
                        keyboardType={'numeric'}  
                    />
                    <View style={{alignItems: 'center', top: (height/2)+100}}>
                        <Button
                            title="Start"
                            onPress={() => this.start()}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{alignItems: 'center'}}>
                    {this.state.isLoading ? <ActivityIndicator style={{position: 'absolute', top: 30}}/> : null}
                    <GameEngine
                        style={{position: 'absolute', left: 0, top: 0}}
                        entities={this.state.entities}
                        systems={[this.simulatorLoop]}
                    />
                    <View style={{alignItems: 'center', top: height-50}}>
                        <Button
                            style={{position: 'absolute', top: 300}}
                            title="Press me"
                            onPress={() => this.changeView()}
                        />
                    </View>
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
