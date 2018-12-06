import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Picker,
  AsyncStorage,
  Alert,
   } from 'react-native';
export default class AddAddressScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '新增收货地址'),
    };
  };

  state={
    province_id:0,
    province:[],
    city_id:0,
    city:[],
    addressList:null,
    district_id:0,
    district:[],
    consignee: null,
    mobile: null,
    address:null,
  };

  _RegionAddress = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'RegionAddress',
      'token':userToken,
      'parent_id':'1',
    };
    let responseJson = await ApiPost(data);
    let addressList = responseJson.Data.addressList;

    province = addressList;

    province_id = addressList[0].id;
    city = province[0].list;
    city_id = city[0].id;
    district = city[0].list;
    district_id = district[0].id;

    const { navigation } = this.props;
    let item = navigation.getParam('item');
    let modify = navigation.getParam('modify');

    console.log(item);

    if(modify){
      province_id = item.province_id;
      

      province.forEach(function (element, index, array) {
        if(element.id == province_id){
          city = element.list;
          return;
        }

      });
      city_id = item.city_id;
      city.forEach(function (element, index, array) {
        if(element.id == city_id){
          district = element.list;
          return;
        }

      });
      district_id = item.district_id;

      this.setState({
        address: item.address,
        consignee: item.consignee,
        mobile: item.mobile,
      });
    }

    this.setState({
      addressList:addressList,
      province:addressList,
      province_id:province_id,
      city:city,
      city_id:city_id,
      district:district,
      district_id:district_id,
    });
    console.log(responseJson.Data.addressList);
  };

  componentWillMount(){
    this._RegionAddress();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>收货人姓名：</Text>
          <TextInput style={styles.input} placeholder='收货人姓名(必填)' 
            onChangeText={(text) => this.setState({consignee:text})}
            value={this.state.consignee}/>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>手机号码：</Text>
          <TextInput style={styles.input} placeholder='手机号码(必填)'
            onChangeText={(text) => this.setState({mobile:text})}
            value={this.state.mobile}/>
        </View>
        <View style={styles.box3}>
          <Text style={styles.text}>省/自治区/直辖市</Text>
          <Picker 
            selectedValue={this.state.province_id}
            onValueChange={(itemValue, itemIndex) => {
              let city = province[itemIndex].list;
              let district = city[0].list;
              this.setState({
                province_id: itemValue,
                city : city,
                city_id: city[0].id,
                district : district,
                district_id: district[0].id,
              });
            }}>
            { this.state.province.map((item, key) => {
              return (<Picker.Item key={'province'+item.id} label={item.name} value={item.id} />)
            })}
          </Picker>
        </View>
        <View style={styles.box3}>
          <Text style={styles.text}>市</Text>
          <Picker 
            selectedValue={this.state.city_id}
            onValueChange={(itemValue, itemIndex) => 
              {
                let district = city[itemIndex].list;
                this.setState({
                  city_id: itemValue,
                  district: district,
                  district_id: district[0].id,
                });
                
              }
            }>
            { this.state.city.map((item, key) => {
              return (<Picker.Item key={'city'+item.id} label={item.name} value={item.id} />)
            })}
          </Picker>
        </View>
        <View style={styles.box3}>
          <Text style={styles.text}>区/县</Text>
          <Picker 
            selectedValue={this.state.district_id}
            onValueChange={(itemValue, itemIndex) => this.setState({district_id: itemValue})}>
            { this.state.district.map((item, key) => {
              return (<Picker.Item key={'district'+item.id} label={item.name} value={item.id} />)
            })}
          </Picker>
        </View>

        <View style={styles.box2}>
          <Text style={styles.text}>详细地址：</Text>
          <TextInput style={styles.input} placeholder='必填' multiline={true} 
            onChangeText={(text) => this.setState({address: text})}
            value={this.state.address}/>
        </View>

        <Button title='新增地址' onPress={this._addAddress}/>
        <View style={{height:50}}/>
      </ScrollView>
    );
  }

  _addAddress = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'AddAddress',
      'token':userToken,
      'consignee':this.state.consignee,
      'province_id':this.state.province_id,
      'city_id': this.state.city_id,
      'district_id': this.state.district_id,
      'address': this.state.address,
      'mobile': this.state.mobile,
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      Alert.alert(
        '添加收货地址',
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
  }

  _EditAddress = async () => {
    //{"Action":"EditAddress","token":"2e6b88dbbf93a4d6095bdea691f6da87",
    //"address_id":"17",
    //"consignee":"顺吵蛤蟆坑",
    //"province_id":"4","city_id":"55","district_id":"540","address":"正义路11号","mobile":"13300000003"}
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    let item = navigation.getParam('item');
    var data = {
      'Action':'EditAddress',
      'token':userToken,
      'address_id': item.address_id,
      'consignee':this.state.consignee,
      'province_id':this.state.province_id,
      'city_id': this.state.city_id,
      'district_id': this.state.district_id,
      'address': this.state.address,
      'mobile': this.state.mobile,
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      Alert.alert(
        '修改收货地址',
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
  box3:{
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.22)',
    marginHorizontal:20,
    paddingVertical:20,
    justifyContent:'space-between',
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
