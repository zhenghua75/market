import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import { MainTabNavigator, SignInNavigator } from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  SignIn: SignInNavigator,
  AuthLoading:AuthLoadingScreen,
},{
	initialRouteName: 'AuthLoading',
});