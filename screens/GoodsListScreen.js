import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Image, Text, 
  View, 
  TouchableOpacity,
  Dimensions,
  FlatList,
    } from 'react-native';

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
  };

  _getGoods=async (cat_id) =>{
    try {
      let response = await fetch(
        'http://jc.ynweix.com/api.php?app_key=E6E3D813-4809-4C98-8D34-A14C7C493A7C&method=dsc.goods.list.get&format=json&cat_id='+cat_id
      );
      let responseJson = await response.json();
      if(responseJson.error != 0){
        throw responseJson;
      }
      let list = responseJson.info.list;
      this.setState({list:list, });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount() {
    const { navigation } = this.props;
    let cat_id = navigation.getParam('cat_id');
    this._getGoods(cat_id);
  }

  _keyExtractor = (item, index) => item.goods_id;

  _renderItem = ({item, index, section}) => {
    return (
        <TouchableOpacity style={styles.result} onPress={this._detail}>
          <Image source={{uri:'http://jc.ynweix.com/'+item.goods_thumb}} style={styles.resultImage}/>
          <Text style={styles.resultTextName}>{item.goods_name}</Text>
          <Text style={styles.resultTextPrice}>¥{item.market_price}</Text>
          <Text style={styles.resultTextSale}>销量{item.sales_volume}</Text>
        </TouchableOpacity>
      );
  };

  render() {
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
            <View style={{flexDirection:'row',padding:10}}>
              <Image source={require('../assets/images/00四个选项/发现.png')} style={{width:20,height:21,}}/>
              <Text style={{fontSize:12,color:'#999999',marginLeft:15,}}>输入商品名</Text>
            </View>
            <View style={{height:36,width:52,borderTopRightRadius:5,borderBottomRightRadius:5,
              backgroundColor:'rgb(255,142,1)',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{color:'#fff'}}>搜索</Text>
            </View>
          </View>
        </View>
        <FlatList
            data={this.state.list}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        <View style={{flexWrap:'wrap',flexDirection:'row',}}>
          <TouchableOpacity style={styles.result} onPress={this._detail}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </TouchableOpacity>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  _detail = async () => {
    this.props.navigation.navigate('GoodsDetail');
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
