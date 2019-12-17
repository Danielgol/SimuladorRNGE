import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './../screens/HomeScreen';
import PoolScreen from './../screens/PoolScreen';

const AppNavigator = createStackNavigator({
	HomeScreen: {
		screen: HomeScreen,
		navigationOptions: {
	      header: null
	    }
	},
	PoolScreen: {
		screen: PoolScreen,
		navigationOptions: {
	      header: null
	    }
	}
});

export default Router = createAppContainer(AppNavigator);