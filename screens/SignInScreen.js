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
} from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>账号登录</Text>
        <View style={styles.box}>
          <Image source={require('../assets/images/02登录注册部分/用户.png')} />
          <TextInput placeholder='用户名/手机号/邮箱' style={styles.input}/>
        </View>
        <View style={styles.box}>
          <Image source={require('../assets/images/02登录注册部分/密码.png')} />
          <TextInput placeholder='密码' style={styles.input}/>
        </View>
        <View style={styles.tip}>
          <Text style={styles.errorTip}>*账号或密码错误，请重新输入</Text>
          <TouchableOpacity onPress={this._forgetPwd}>
            <Text style={styles.forgetPwdText}>忘记密码</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._signInAsync} style={styles.btn}>
          <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={styles.btnBkg}>
            <Text>登录</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._register} style={styles.btn}>
          <ImageBackground source={require('../assets/images/02登录注册部分/注册新账号.png')} style={styles.btnBkg}>
            <Text>注册新账号</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  // contentContainer: {
  //   alignItems:'center',
  // },
  title:{
    fontSize:20,
    color:'#3f3f3f',
    marginTop:50,
    marginBottom:129,
    textAlign:'center',
  },
  box:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'#000000',
    padding:20,
    marginHorizontal:20,
  },
  input:{
    marginLeft:16,
    fontSize:18,
    flex:1,
  },
  tip:{
    flexDirection:'row',
  },
  errorTip:{
    fontSize:14,
    color:'#f23e57',
  },
  forgetPwdText:{
    fontSize:14,
    color:'#ff8f00',
  },
  btn:{
    alignItems:'center',
    justifyContent:'center',
  },
  btnBkg:{
    width: 223, 
    height: 47,
    alignItems:'center',
    justifyContent:'center',
  },
});
