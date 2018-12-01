import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Image, Text, 
  View, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  AsyncStorage,
  TextInput
    } from 'react-native';

import ApiPost from '../lib/ApiPost';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '商品列表',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state={
    list:[],
    GoodName:null,
  };

  _getGoodsList=async (cat_id) =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetGoods',
      'token':userToken,
      'PageSize':'10',
      'Page': '0',
      'Cat_id': cat_id,
      'Is_Best':'0',
      'GoodName':'',
    };
    let responseJson = await ApiPost(data);
    console.log(responseJson.Data);
    let list = responseJson.Data.Data;
    this.setState({list:list, });
  };

  componentWillMount() {
    const { navigation } = this.props;
    let cat_id = navigation.getParam('cat_id');
    this._getGoodsList(cat_id);
  }

  _keyExtractor = (item, index) => item.goods_id;

  _renderItem = ({item, index, section}) => {
    return (
        <TouchableOpacity style={styles.result} onPress={() => {this._detail(item.goods_id)}}>
          <Image source={{uri:item.goods_thumb.Data}} style={styles.resultImage}/>
          <View style={{padding:12,}}>
            <Text style={styles.resultTextName}>{item.goods_name}</Text>
            <Text style={styles.resultTextPrice}>¥{item.market_price}</Text>
            <Text style={styles.resultTextSale}>销量{item.sales_volume}</Text>
          </View>
        </TouchableOpacity>
      );
  };

  render() {
    let cols = Math.floor((Dimensions.get('window').width-40)*170/375);
    return (
      <ScrollView style={styles.container}>
        <View style={{height:65,alignItems:'center',backgroundColor:'#fff'}}>
          <View style={{margin:12,height:36,
            width:Dimensions.get('window').width-24,
            flexDirection:'row',borderRadius:5,
          backgroundColor:'rgb(234,238,237)',
          alignItems:'center',
          justifyContent:'space-between',
        }}>
            <View style={{flexDirection:'row',padding:10,flex:1}}>
              <Image source={require('../assets/images/00四个选项/发现.png')} style={{width:20,height:21,}}/>
              <TextInput 
                style={{fontSize:12,color:'#999999',flex:1}}
                onChangeText={(text) => this.setState({GoodName:text})}
                placeholder={'输入商品名'}
              ></TextInput>
            </View>
            <TouchableOpacity 
              style={{height:36,width:52,borderTopRightRadius:5,borderBottomRightRadius:5,
                backgroundColor:'rgb(255,142,1)',
                alignItems:'center',
                justifyContent:'center',
              }}
              onPress={this._search}
            >
              <Text style={{color:'#fff'}}>搜索</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.list.length>0?
        <FlatList
            data={this.state.list}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            numColumns={cols}
          />:
        <View style={{alignItems:'center',marginTop:50,}}>
          <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
          <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有匹配商品哦~</Text>
        </View>}
      </ScrollView>
    );
  }

  _detail = async (goods_id) => {
    this.props.navigation.navigate('GoodsDetail',{'goods_id':goods_id});
  };

  _search = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    let cat_id = navigation.getParam('cat_id');
    var data = {
      'Action':'GetGoods',
      'token':userToken,
      'PageSize':'10',
      'Page': '0',
      'Cat_id': cat_id,
      'Is_Best':'0',
      'GoodName':this.state.GoodName,
    };
    let responseJson = await ApiPost(data);
    console.log(responseJson.Data);
    let list = responseJson.Data.Data;
    this.setState({list:list, });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  boxText:{
    flex:1,
  },
  result:{
    marginHorizontal:10,
    width:Dimensions.get('window').width*170/375,
  },
  resultImage:{
    width:Dimensions.get('window').width*170/375,
    height:Dimensions.get('window').width*170/375,
  },
  resultTextName:{
    fontSize:14,
    color:'#3F3F3F',
  },
  resultTextPrice:{
    fontSize:14,
    color:'#FF8F00',
  },
  resultTextSale:{
    fontSize:12,
    color:'#c7c7c7',
    textAlign:'right',
  },
});
