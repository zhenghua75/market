import React from 'react';
import { Platform,Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import BuildingMaterialsScreen from '../screens/BuildingMaterialsScreen';
import FindScreen from '../screens/FindScreen';
import ConstructionTeamScreen from '../screens/ConstructionTeamScreen';
import MyScreen from '../screens/MyScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/首页-选中.png') : require('../assets/images/00四个选项/首页.png') }/>
  ),
};

const BuildingMaterialsStack = createStackNavigator({
  BuildingMaterials: BuildingMaterialsScreen,
});

BuildingMaterialsStack.navigationOptions = {
  tabBarLabel: '建材',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/建材-选中.png') : require('../assets/images/00四个选项/建材.png') }/>
  ),
};

const FindStack = createStackNavigator({
  Find: FindScreen,
});

FindStack.navigationOptions = {
  tabBarLabel: '发现',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/发现-选中.png') : require('../assets/images/00四个选项/发现.png') }/>
  ),
};

const ConstructionTeamStack = createStackNavigator({
  ConstructionTeam: ConstructionTeamScreen,
});

ConstructionTeamStack.navigationOptions = {
  tabBarLabel: '施工队',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/施工队-选中.png') : require('../assets/images/00四个选项/施工队.png') }/>
  ),
};

const MyStack = createStackNavigator({
  My: MyScreen,
});

MyStack.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/我的-选中.png') : require('../assets/images/00四个选项/我的.png') }/>
  ),
};

const AuthLoadingStack = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
});

AuthLoadingStack.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/我的-选中.png') : require('../assets/images/00四个选项/我的.png') }/>
  ),
};

export default createBottomTabNavigator({
  Home:HomeStack,
  BuildingMaterials:BuildingMaterialsStack,
  Find:FindStack,
  ConstructionTeam:ConstructionTeamStack,
  AuthLoading:AuthLoadingStack,
},{
  tabBarOptions :{
    activeTintColor:'#ff8f00',
    labelStyle: {
      fontSize: 13,
    },
  }
});
