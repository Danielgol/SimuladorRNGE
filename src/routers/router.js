import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './../screens/HomeScreen';
import PoolScreen from './../screens/PoolScreen';

const AppNavigator = createStackNavigator({
	HomeScreen: {
		screen: HomeScreen
	}
});

export default Router = createAppContainer(AppNavigator);