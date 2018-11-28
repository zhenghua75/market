import React from 'react';
import { ScrollView, StyleSheet,Image,Text } from 'react-native';

export default class SignUpSuccessScreen extends React.Component {
  static navigationOptions = {
    title: '注册成功',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image source={require('../assets/images/02登录注册部分/笑脸.png')} style={{width:83,height:83,marginTop:106}}/>
        <Text style={styles.title}>恭喜您，注册成功啦！</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems:'center',
  },
  title:{
    fontSize:20,
    color:'#3f3f3f',
    marginTop:41,
  },
});
