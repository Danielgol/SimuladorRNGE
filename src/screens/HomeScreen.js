import { AppRegistry, View, StyleSheet, Dimensions,
         Image, TextInput, Button, StatusBar, Text } from 'react-native';
import React, {Component} from 'react';

const url = "http://10.0.0.109:8060/receber";
const { width, height } = Dimensions.get("screen");

export default class HomeScreen extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        StatusBar.setHidden(true);
    }

    start = () => {
        this.props.navigation.navigate('PoolScreen');
    }

    render(){
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
    }

}
