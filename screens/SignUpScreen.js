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

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>用户注册</Text>
        <View style={styles.box}>
          <Image source={require('../assets/images/02登录注册部分/注册用户.png')} />
          <TextInput placeholder='手机号/邮箱' style={styles.input}/>
        </View>
        <View style={styles.box}>
          <Image source={require('../assets/images/02登录注册部分/验证码.png')} />
          <TextInput placeholder='密码' style={styles.input}/>
          <TouchableOpacity onPress={this._signInAsync} style={styles.btn}>
          <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={styles.btnBkg}>
            <Text>发送验证码</Text>
          </ImageBackground>
        </TouchableOpacity>
        </View>
        <View style={styles.contract}>
          <Image source={require('../assets/images/02登录注册部分/不同意.png')} />
          <Text style={styles.contractText}>我已阅读并同意</Text>
          <TouchableOpacity onPress={this._forgetPwd}>
            <Text style={styles.contractBtn}>注册协议</Text>
          </TouchableOpacity>
          
          
        </View>
        <TouchableOpacity onPress={this._nextAsync} style={styles.btn}>
          <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={styles.btnBkg}>
            <Text>下一步</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._signInAsync} style={styles.btn}>
          <ImageBackground source={require('../assets/images/02登录注册部分/注册新账号.png')} style={styles.btnBkg}>
            <Text>已有账号登陆</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('SignIn');
  };

  _nextAsync = ()=>{
    this.props.navigation.navigate('SignUpSuccess');
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
  contract:{
    flexDirection:'row',
  },
  contractText:{
    fontSize:14,
    color:'#f23e57',
  },
  contractBtn:{
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
