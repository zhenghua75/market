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
import InfoListScreen from '../screens/InfoListScreen';
import InfoScreen from '../screens/InfoScreen';
import AllOrderScreen from '../screens/AllOrderScreen';
import SearchOrderScreen from '../screens/SearchOrderScreen';
import CustomServiceScreen from '../screens/CustomServiceScreen';
import PositionScreen from '../screens/PositionScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import SearchScreen from '../screens/SearchScreen';
import BrandScreen from '../screens/BrandScreen';
import BrandDetailScreen from '../screens/BrandDetailScreen';
import CatalogScreen from '../screens/CatalogScreen';
import GoodsListScreen from '../screens/GoodsListScreen';
import FindDetailScreen from '../screens/FindDetailScreen';
import ImageDetailScreen from '../screens/ImageDetailScreen';
import ConstructionTeamDetailScreen from '../screens/ConstructionTeamDetailScreen';
import DecorationStrategyListScreen from '../screens/DecorationStrategyListScreen';
import DecorationStrategyDetailScreen from '../screens/DecorationStrategyDetailScreen';
import AllSciencesListScreen from '../screens/AllSciencesListScreen';
import AllSciencesDetailScreen from '../screens/AllSciencesDetailScreen';
import GoodsDetailScreen from '../screens/GoodsDetailScreen';
import StoreScreen from '../screens/StoreScreen';
import StoreListScreen from '../screens/StoreListScreen';
import StoreInScreen from '../screens/StoreInScreen';
import GoodsDetailCommentScreen from '../screens/GoodsDetailCommentScreen';
import SettlementScreen from '../screens/SettlementScreen';
import AlipayScreen from '../screens/AlipayScreen';
import UserSettingScreen from '../screens/UserSettingScreen';

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

const CartStack = createStackNavigator({
    Cart: CartScreen,
});

CartStack.navigationOptions = {
  tabBarLabel: '购物车',
  tabBarIcon: ({ focused }) => (
    <Image source={ focused  ? require('../assets/images/00四个选项/购物车-选中.png') : require('../assets/images/00四个选项/购物车.png') }/>
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

const SignInStack = createStackNavigator({
  SignIn: SignInScreen,
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
  Cart:CartStack,
  My:MyStack,
},{
  tabBarOptions :{
    activeTintColor:'#ff8f00',
    labelStyle: {
      fontSize: 13,
    },
  },
});

MainTabNavigator.navigationOptions = {
  header: null,
};

const SignInNavigator = createBottomTabNavigator({
  Home:HomeStack,
  BuildingMaterials:BuildingMaterialsStack,
  Find:FindStack,
  Cart:CartStack,
  My:SignInStack,
},{
  tabBarOptions :{
    activeTintColor:'#ff8f00',
    labelStyle: {
      fontSize: 13,
    },
  }
});

SignInNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

const MainStack = createStackNavigator({
  Tabs: MainTabNavigator,
  Cart:CartScreen,
  ModifyPwd:ModifyPwdScreen,
  InfoList:InfoListScreen,
  Info:InfoScreen,
  AllOrder:AllOrderScreen,
  SearchOrder:SearchOrderScreen,
  CustomService:CustomServiceScreen,
  Position:PositionScreen,
  AddAddress:AddAddressScreen,
  Search:SearchScreen,
  Brand:BrandScreen,
  BrandDetail:BrandDetailScreen,
  Catalog:CatalogScreen,
  GoodsList:GoodsListScreen,
  FindDetail:FindDetailScreen,
  ImageDetail:ImageDetailScreen,
  ConstructionTeam:ConstructionTeamScreen,
  ConstructionTeamDetail:ConstructionTeamDetailScreen,
  DecorationStrategyList:DecorationStrategyListScreen,
  DecorationStrategyDetail:DecorationStrategyDetailScreen,
  AllSciencesList:AllSciencesListScreen,
  AllSciencesDetail:AllSciencesDetailScreen,
  GoodsDetail:GoodsDetailScreen,
  Store:StoreScreen,
  StoreList:StoreListScreen,
  StoreIn:StoreInScreen,
  GoodsDetailComment:GoodsDetailCommentScreen,
  Settlement:SettlementScreen,
  Alipay:AlipayScreen,
  UserSetting:UserSettingScreen,
});

const AuthStack = createStackNavigator({
  Tabs: SignInNavigator,
  SignUp: SignUpScreen,
  SignUpSuccess: SignUpSuccessScreen,
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainStack,
  Auth: AuthStack,
  AuthLoading:AuthLoadingScreen,
},{
  initialRouteName:'AuthLoading',
});
