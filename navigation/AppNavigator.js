import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: SigninScreen,
    AuthLoading: AuthLoadingScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
