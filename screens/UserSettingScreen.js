import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  AsyncStorage,
  Alert,
   } from 'react-native';

import ApiPost from '../lib/ApiPost';

export default class UserSettingScreen extends React.Component {
  static navigationOptions = {
    title: '个人设置',
  };

  state={
    userinfo:{}
  };

  _getUserInfo=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetUserInfo',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    this.setState({
        userinfo:responseJson.Data
    });
  };

  componentWillMount() {
    this._getUserInfo();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>头像</Text>
          <View style={styles.content}>
            <Image source={{uri:this.state.userinfo.user_picture}} style={styles.userpic}/>
          </View>
          <Image source={require('../assets/images/06个人中心/向右箭头.png')}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>昵称</Text>
          <View style={styles.content}>
            <Text style={styles.contenttext}>{this.state.userinfo.nick_name}</Text>
          </View>
          <Image source={require('../assets/images/06个人中心/向右箭头.png')}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>性别</Text>
          <View style={styles.content}>
            <Text style={styles.contenttext}>{this.state.userinfo.sex}</Text>
          </View>
          <Image source={require('../assets/images/06个人中心/向右箭头.png')}/>
        </View>
        <TouchableOpacity style={styles.row} onPress={this._position}>
          <Text style={styles.label}>收货地址</Text>
          <View style={styles.content}>
            <Text style={styles.contenttext}></Text>
          </View>
          <Image source={require('../assets/images/06个人中心/向右箭头.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={this._modPwd}>
          <Text style={styles.label}>修改登录密码</Text>
          <View style={styles.content}>
            <Text style={styles.contenttext}></Text>
          </View>
          <Image source={require('../assets/images/06个人中心/向右箭头.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._signOutAsync} style={styles.btn}>
            <Text style={styles.btntext}>退出</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('SignIn');
  };

  _position = async () => {
    this.props.navigation.navigate('Position');
  };

  _modPwd = async () => {
    this.props.navigation.navigate('ModifyPwd');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row:{
    flexDirection:'row',
    padding:15,
    borderBottomWidth:1,
    borderColor:'#eeeeee',
    alignItems:'center',
  },
  label:{
    fontSize:16,
  },
  content:{
    flex:1,
    alignItems:'flex-end',
    marginRight:10,
  },
  contenttext:{
    fontSize:16,
    color:'#aaaaaa',
  },
  userpic:{
    width: 50, 
    height: 50,
    borderWidth:1,
    borderColor:'#eeeeee',
    borderRadius:25,
  },
  btn:{
    flex:1,
    margin:20,
    alignItems:'center',
    padding:10,
    borderWidth:1,
    borderColor:'#ec5151',
  },
  btntext:{
      fontSize:16,
      color:'#ec5151',
  }
});
