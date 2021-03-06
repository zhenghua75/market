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
import { ExpoLinksView } from '@expo/samples';
import ApiPost from '../lib/ApiPost';

export default class ModifyPwdScreen extends React.Component {
  static navigationOptions = {
    title: '修改密码',
  };

  state = {
    oldpasswd:null,
    passwd: null,
    passwdConfirm: null,
  };

  _modPassword=async (token,oldpasswd,passwd,passwdConfirm) =>{
    var data = {
      'Action':'ModPassword',
      'OldPassword': oldpasswd,
      'Password': passwd,
      'PasswordConfirm': passwdConfirm,
      'token': token
    };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      Alert.alert(
        '修改密码',
        responseJson.MessageString,
        [
          {text: '确定', onPress: () => {
            console.log(responseJson);
            this.props.navigation.pop();
          }},
        ],
        { cancelable: false }
      )
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <TextInput placeholder='原密码' style={styles.input} secureTextEntry={true}
            onChangeText={(text) => this.setState({oldpasswd:text})}/>
          <Image source={require('../assets/images/06个人中心/眼睛.png')}/>
        </View>
        <View style={styles.row}>
          <TextInput placeholder='新密码' style={styles.input} secureTextEntry={true}
            onChangeText={(text) => this.setState({passwd:text})}/>
          <Image source={require('../assets/images/06个人中心/眼睛.png')}/>
        </View>
        <View style={styles.row}>
          <TextInput placeholder='确认密码' style={styles.input} secureTextEntry={true}
            onChangeText={(text) => this.setState({passwdConfirm:text})}/>
          <Image source={require('../assets/images/06个人中心/眼睛.png')}/>
        </View>
        <TouchableOpacity onPress={this._modifyPwd} style={styles.btn}>
          <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={styles.btnBkg}>
            <Text>确认修改</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _modifyPwd = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    await this._modPassword(userToken,this.state.oldpasswd,this.state.passwd,this.state.passwdConfirm);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row:{
    flexDirection:'row',
    marginTop:14,
  },
  input:{
    marginHorizontal:15,
    fontSize:18,
    flex:0.9,
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
