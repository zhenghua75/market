import React from 'react';
import { Platform,Image,AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import BuildingMaterialsScreen from '../screens/BuildingMaterialsScreen';
import FindScreen from '../screens/FindScreen';
import ConstructionTeamScreen from '../screens/ConstructionTeamScreen';
import MyScreen from '../screens/MyScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpSuccessScreen from '../screens/SignUpSuccessScreen';
import ModifyPwdScreen from '../screens/ModifyPwdScreen';
import CartScreen from '../screens/CartScreen';

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
  ModifyPwd:ModifyPwdScreen,
  Cart:CartScreen,
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

const SignInStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  SignUpSuccess: SignUpSuccessScreen,
});

SignInStack.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/我的-选中.png') : require('../assets/images/00四个选项/我的.png') }/>
  ),
};


const MainTabNavigator = createBottomTabNavigator({
  Home:HomeStack,
  BuildingMaterials:BuildingMaterialsStack,
  Find:FindStack,
  ConstructionTeam:ConstructionTeamStack,
  My:MyStack,
},{
  tabBarOptions :{
    activeTintColor:'#ff8f00',
    labelStyle: {
      fontSize: 13,
    },
  }
});

const SignInNavigator = createBottomTabNavigator({
  Home:HomeStack,
  BuildingMaterials:BuildingMaterialsStack,
  Find:FindStack,
  ConstructionTeam:ConstructionTeamStack,
  My:SignInStack,
},{
  tabBarOptions :{
    activeTintColor:'#ff8f00',
    labelStyle: {
      fontSize: 13,
    },
  }
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  SignIn: SignInNavigator,
  AuthLoading:AuthLoadingScreen,
},{
  initialRouteName:'AuthLoading',
});
