import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentScreen2 from '../screens/PaymentScreen2';

import WalletScreen from '../screens/WalletScreen';

// =======
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Find parking',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-search'} />,
};

// =======
const WalletStack = createStackNavigator({
  Wallet: WalletScreen,
  Payment: PaymentScreen,
  Confirm: PaymentScreen2,
});

WalletStack.navigationOptions = {
  tabBarLabel: 'Wallet',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-wallet'} />,
};

// =======
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'ios-contact'} />,
};

// =========
export default createBottomTabNavigator({
  HomeStack,
  WalletStack,
  ProfileStack,
});
