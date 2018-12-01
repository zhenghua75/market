import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Button,
  FlatList,
  AsyncStorage ,
  View,
  Text,
   } from 'react-native';
import { MapView } from 'expo';

import Swipeout from 'react-native-swipeout';

export default class PositionScreen extends React.Component {
  static navigationOptions = {
    title: '定位',
  };
  state={
    list:[]
  };
  _GetAddressList = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetAddressList',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    this.setState({list:responseJson.Data.consignee_list})
    console.log(responseJson);
  };
  _EditAddress = async () => {
    
  };
  _DeleteAddress = async (address_id) => {
    //{"Action":"DeleteAddress","token":"2e6b88dbbf93a4d6095bdea691f6da87","address_id":"13"}
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'DeleteAddress',
      'token':userToken,
      'address_id':address_id,
    };
    let responseJson = await ApiPost(data);
    this.setState({list:responseJson.Data.consignee_list})
    console.log(responseJson);
  };

  _keyExtractor = (item, index) => item.cat_id;
  componentWillMount(){
    this._GetAddressList();
  };

  _renderItem = ({item, index, section}) => {
    let swipeoutBtns = [
      {
        text: '修改',
        type: 'primary',
        onPress: ()=>this.props.navigation.navigate('AddAddress',{'item':item}),
      },
      {
        text: '删除',
        type: 'delete', 
        onPress: () => { this._DeleteAddress(item.address_id)},
      }
    ]
    return (
      <Swipeout key={item.address_id} right={swipeoutBtns}>
        <View >
          <Text>{item.address}</Text>
          <Text>{item.mobile}</Text>
        </View>
      </Swipeout>
        
      );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
            data={this.state.list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        <Button title='新增收货地址' onPress={this._addAddress}/>
      </ScrollView>
    );
  }

  _addAddress = async () => {
    this.props.navigation.navigate('AddAddress');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
