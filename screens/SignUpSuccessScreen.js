import React from 'react';
import { ScrollView, StyleSheet,Image,Text } from 'react-native';

export default class SignUpSuccessScreen extends React.Component {
  static navigationOptions = {
    title: '注册成功',
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image source={require('../assets/images/02登录注册部分/笑脸.png')} />
        <Text style={styles.title}>恭喜您，注册成功啦！</Text>
      </ScrollView>
    );
  }
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
