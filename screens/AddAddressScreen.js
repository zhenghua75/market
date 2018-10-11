import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
   } from 'react-native';
export default class AddAddressScreen extends React.Component {
  static navigationOptions = {
    title: '新增收货地址',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>收货人姓名：</Text>
          <TextInput style={styles.input} placeholder='收货人姓名(必填)'/>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>手机号码：</Text>
          <TextInput style={styles.input} placeholder='手机号码(必填)'/>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>省/自治区/直辖市</Text>
          <Button style={styles.input} title='云南省' onPress={()=>{}}/>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>市</Text>
          <Button style={styles.input} title='昆明市' onPress={()=>{}}/>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text}>区/县</Text>
          <Button style={styles.input} title='盘龙区' onPress={()=>{}}/>
        </View>

        <View style={styles.box2}>
          <Text style={styles.text}>详细地址：</Text>
          <TextInput style={styles.input} placeholder='必填' multiline={true}/>
        </View>

        <Button title='新增地址' onPress={()=>{}}/>
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
  box:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.22)',
    marginHorizontal:20,
    paddingVertical:20,
  },
  box1:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.22)',
    marginHorizontal:20,
    paddingVertical:20,
    justifyContent:'space-between',
  },
  box2:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.22)',
    marginHorizontal:20,
    paddingVertical:20,
    height:130,
  },
  text:{
    fontSize:16,
    color:'#3f3f3f',
  },
  input:{
    flex:1,
    fontSize:14,
  }
});
