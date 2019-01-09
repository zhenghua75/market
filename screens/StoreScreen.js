import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Image, Text, 
  View, 
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ImageBackground,
  FlatList
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '店铺首页',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  constructor(props){
    super(props);
    this.page = 1;
    this.totalpage = 0;
    this.state = {
        storeinfo:{},
        goodlist:[],
        isLoadMore:false
    }
  }

  componentWillMount() {
    this._getStoreInfo();
    this._getGoodsList();
  }

  _getStoreInfo=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    let shop_id = navigation.getParam('shop_id');
    var data = {
      'Action':'GetStoreInfo',
      'token':userToken,
      'shop_id':shop_id,
    };
    let responseJson = await ApiPost(data);
    this.setState({
        storeinfo:responseJson.Data
    });
  };

  _getGoodsList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    let shop_id = navigation.getParam('shop_id');
    var data = {
      'Action':'GetStoreGoods',
      'token':userToken,
      'shop_id':shop_id,
      'page':this.page,
      'size':10,
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data.Data;
    this.totalpage=responseJson.Data.totalPage;
    if(this.page===1){
        this.setState({
            goodlist:list,
            isLoadMore:false
        });
    }else{
        this.setState({
            isLoadMore : false,
            goodlist: this.state.data.concat(list),
        });
    }
  };

  _keyExtractor = (item, index) => item.goods_id;

  _onPressItem = (id) => {
    this.props.navigation.navigate('GoodsDetail',{'goods_id':id});
  };

  _onLoadMore(){
    if (!this.state.isLoadMore && this.totalpage>this.page){
        this.setState({
            isLoadMore : true
        });
        this.page = this.page + 1;
        this._getGoodsList();
    }
  }

  _createListItem = ({item}) => {
    return (
        <TouchableOpacity style={styles.result} onPress={() => {this._onPressItem(item.goods_id)}}>
          <Image source={{uri:item.goods_thumb.Data}} style={styles.resultImage}/>
          <View style={{padding:12,}}>
            <Text style={styles.resultTextName}>{item.goods_name}</Text>
            <Text style={styles.resultTextPrice}>¥{item.shop_price}</Text>
            <Text style={styles.resultTextSale}>销量{item.sales_volume}</Text>
          </View>
        </TouchableOpacity>
      );
  }

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有商品哦~</Text>
        </View>
    );
  }

  _createListFooter(){
    if(this.totalpage==this.page){
        return (
            <View style={styles.footerView}>
                <Text style={{color:'#464646'}}>
                    已经到底了！
                </Text>
            </View>
        );
    }else{
        return (
            <View style={styles.footerView}>
                <Text style={{color:'#464646'}}>
                    加载更多
                </Text>
            </View>
        );
    }
  }

  render() {
    let info=this.state.storeinfo;
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={{uri:info.shop_flash}} style={{
            width:width,
            height:Math.floor((width) * 190/490),
            justifyContent:'center',
        }}>
            <View style={{flexDirection:'row',alignItems:'center',padding:12,flex:1,backgroundColor:'rgba(51, 51, 51, 0.5)'}}>
                <Image source={{uri:info.shop_logo}} style={{height:70,width:70}}/>
                <Text style={{fontSize:16,color:'#fff',marginLeft:10,}}>{info.shop_name}</Text>
            </View>
        </ImageBackground>
        <FlatList
            style={styles.container}
            data={this.state.goodlist}
            keyExtractor={this._keyExtractor}
            renderItem={this._createListItem}
            ListEmptyComponent={this._createEmptyView}
            ListFooterComponent={this._createListFooter}
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.5}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  result:{
    marginHorizontal:10,
    width:170,
  },
  resultImage:{
    width:170,
    height:170,
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
  footerView:{
    width:width,
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
});
