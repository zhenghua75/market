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
  _DeleteAddress = async (address_id) => {
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

  _keyExtractor = (item, index) => item.address_id;

  componentWillMount(){
    this._GetAddressList();
  };

  _renderItem = ({item, index, section}) => {
    let swipeoutBtns = [
      {
        text: '修改',
        type: 'primary',
        onPress: ()=>{ this._modifyAddress(item.address_id,item.consignee,item.province,item.city,item.district,item.address,item.mobile)},
      },
      {
        text: '删除',
        type: 'delete', 
        onPress: () => { this._DeleteAddress(item.address_id)},
      }
    ]
    return (
      <Swipeout right={swipeoutBtns}>
        <View>
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
        <Button title='新增收货地址' onPress={this._addAddress} />
      </ScrollView>
    );
  }

  _addAddress = async () => {
    this.props.navigation.navigate('AddAddress');
  };

  _modifyAddress = async (address_id,consignee,province_id,city_id,district_id,address,mobile) => {
    this.props.navigation.navigate('AddAddress',{
      'title':'修改收货地址',
      'item': {
        address: address,
        address_id: address_id,
        city_id: city_id,
        consignee: consignee,
        district_id: district_id,
        mobile: mobile,
        province_id: province_id,
      },
      'modify': true,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
