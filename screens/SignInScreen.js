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
  Dimensions,
} from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state = {
    username:null,
    passwd: null,
  };

  _userLogin=async (username,passwd) =>{
    try {
      var data = {
        'Action':'UserLogin',
        'Username': username,
        'Password': passwd,
      };
      let response = await fetch('http://jc.ynweix.com/api/appclient/api.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'Json=' + encodeURIComponent(JSON.stringify(data))
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if(!responseJson.Result){
        throw responseJson;
      }
      await AsyncStorage.setItem('userToken', responseJson.Token);
    } catch (error) {
      console.error(error);
    }
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
        }}>账号登录</Text>
        <View style={{
          flexDirection:'row',
          borderBottomWidth:1,
          borderColor:'#e5e5e5',
          padding:14,
          marginHorizontal:40,
        }}>
          <Image source={require('../assets/images/02登录注册部分/用户.png')} style={{width:20,height:20,}}/>
          <TextInput placeholder='用户名/手机号/邮箱' onChangeText={(text) => this.setState({username:text})}
            underlineColorAndroid={'white'} style={{
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
          justifyContent:'space-between',
          padding:14,
          marginHorizontal:40,
        }}>
          <Text style={{
            fontSize:14,
            color:'#f23e57',
          }}>*账号或密码错误，请重新输入</Text>
          <TouchableOpacity onPress={this._forgetPwd}>
            <Text style={{
              fontSize:14,
              color:'#ff8f00',
            }}>忘记密码</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._signInAsync} style={{
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
            <Text style={{fontSize:14,color:'#fff'}}>登录</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._register} style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:14,
        }}>
          <View style={{
            width: 223, 
            height: 40,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:3,
            borderColor:'#ff8f00',
            borderRadius:20,
          }}>
            <Text style={{fontSize:14,color:'#ff8f00'}}>注册新账号</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _signInAsync = async () => {
    this._userLogin( this.state.username, this.state.passwd);
    this.props.navigation.navigate('Main');
  };

  _forgetPwd = ()=>{};
  _register = ()=>{
    this.props.navigation.navigate('SignUp');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
