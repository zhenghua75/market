import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Button,
  TextInput,
   } from 'react-native';

export default class CustomServiceScreen extends React.Component {
  static navigationOptions = {
    title: '客户服务',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Button title='留言' onPress={()=>{}} style={styles.btn}/>
          <Button title='投诉' onPress={()=>{}} style={styles.btn}/>
          <Button title='咨询' onPress={()=>{}} style={styles.btn}/>
          <Button title='售后' onPress={()=>{}} style={styles.btn}/>
          <Button title='求购' onPress={()=>{}} style={styles.btn}/>
        </View>
        <TextInput placeholder='主题' style={{fontSize:14,}}/>
        <TextInput placeholder='内容' multiline={true} maxLength = {40} style={{height:133,}}/>
        <Button title='提交' onPress={()=>{}} color='#ff8f00'/>
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
  btn:{
    flex:0.2,
  }
});
