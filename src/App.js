import React from 'react';
import { View , StyleSheet , Text } from 'react-native';

import Router from './routers/router';

export default class App extends React.Component {
    render(){
        return(
            <Router/>
        );
    }
}
