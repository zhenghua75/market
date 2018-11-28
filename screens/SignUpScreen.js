import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import { Constants } from 'expo';

import ApiPost from '../lib/ApiPost';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state = {
    username:null,
    passwd: null,
    success: null,
    captcha:null,
  };
  _userRegister=async (username,passwd) =>{
    var data = {
        'Action':'UserRegister',
        'Username': username,
        'Password': passwd,
      };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      this.props.navigation.navigate('SignUpSuccess');
    }
    this.setState({success: responseJson.Result});
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={{
          fontSize:20,
          color:'#3f3f3f',
          marginTop:55,
          marginBottom:130,
          textAlign:'center',
        }}>用户注册</Text>
        <View style={{
          flexDirection:'row',
          borderBottomWidth:1,
          borderColor:'#e5e5e5',
          padding:14,
          marginHorizontal:40,
        }}>
          <Image source={require('../assets/images/02登录注册部分/注册用户.png')} style={{width:20,height:20,}}/>
          <TextInput placeholder='手机号/邮箱' underlineColorAndroid={'white'} 
            onChangeText={(text) => this.setState({username:text})}
            value={this.state.username}
            style={{
              marginLeft:16,
              fontSize:18,
              flex:1,
          }}/>
        </View>
        <View style={{
          flexDirection:'row',
          borderBottomWidth:1,
          borderColor:'#e5e5e5',
          padding:14,
          marginHorizontal:40,
        }}>
          <Image source={require('../assets/images/02登录注册部分/验证码.png')} style={{width:20,height:20,}}/>
          <TextInput placeholder='验证码' underlineColorAndroid={'white'} 
            onChangeText={(text) => this.setState({captcha:text})}
            value={this.state.text}
            style={{
              marginLeft:16,
              fontSize:18,
              flex:1,
          }}/>
          <TouchableOpacity style={styles.btn}>
          <View style={{
            width:75,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#ff8f00',
            borderRadius:20,
          }}>
            <Text>发送验证码</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={{
          flexDirection:'row',
          borderBottomWidth:1,
          borderColor:'#e5e5e5',
          padding:14,
          marginHorizontal:40,
        }}>
          <Image source={require('../assets/images/02登录注册部分/密码.png')}  style={{width:20,height:20,}}/>
          <TextInput placeholder='密码' onChangeText={(text) => this.setState({passwd:text})}
            underlineColorAndroid={'white'} secureTextEntry={true} style={{
              marginLeft:16,
              fontSize:18,
              flex:1,
          }}/>
        </View>
        <View style={{
          flexDirection:'row',
          padding:14,
          marginHorizontal:40,
          alignItems:'center',
        }}>
          <Image source={require('../assets/images/02登录注册部分/不同意.png')} />
          <Text style={{fontSize:14,color:'#c7c7c7',marginLeft:10,}}>我已阅读并同意</Text>
          <TouchableOpacity onPress={this._forgetPwd}>
            <Text style={{fontSize:14,color:'#ff8f00',textDecorationLine:'underline'}}>注册协议</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._nextAsync} style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:93,
        }}>
          <View style={{
            width:223,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#ff8f00',
            borderRadius:20,
          }}>
            <Text>下一步</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._signInAsync} style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:14,
        }}>
          <View source={require('../assets/images/02登录注册部分/注册新账号.png')} style={{
            width: 223, 
            height: 40,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:3,
            borderColor:'#ff8f00',
            borderRadius:20,
          }}>
            <Text>已有账号登陆</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _signInAsync = async () => {
    this.props.navigation.navigate('SignIn');
  };

  _nextAsync = ()=>{
    this._userRegister(this.state.username, this.state.passwd);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});
