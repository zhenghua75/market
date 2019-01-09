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
  TextInput,
  ImageBackground
} from 'react-native';

import ApiPost from '../lib/ApiPost';

const {width, height} = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '品牌商品',
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
        brandinfo:{},
        list:[],
        isRefresh:false,
        isLoadMore:false,
        brandid:0,
    }
  }

  _getBrandGoods=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetBrandGoods',
      'token':userToken,
      'size':'10',
      'page': this.page,
      'brand_id': this.state.brandid,
    };
    let responseJson = await ApiPost(data);
    this.totalpage=responseJson.Data.totalPage;
    if(this.page===1){
        this.setState({
            brandinfo:responseJson.Data.brandinfo,
            list:responseJson.Data.goods,
            isRefresh:false,
            isLoadMore:false
        });
    }else{
        this.setState({
            brandinfo:responseJson.Data.brandinfo,
            isLoadMore : false,
            list: this.state.list.concat(responseJson.Data.goods),
            isRefresh:false
        });
    }
  };

  _onLoadMore(){
    if (!this.state.isLoadMore && this.totalpage>this.page){
        this.setState({
            isLoadMore : true
        });
        this.page = this.page + 1;
        this._getBrandGoods();
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    let brand_id = navigation.getParam('brand_id');
    this.setState({
        brandid : brand_id
    });
    this._getBrandGoods();
  }

  _keyExtractor = (item, index) => item.goods_id;

  _renderItem = ({item, index, section}) => {
    return (
        <TouchableOpacity style={styles.result} onPress={() => {this._detail(item.goods_id)}}>
          <Image source={{uri:item.goods_thumb}} style={styles.resultImage}/>
          <View style={{padding:12,}}>
            <Text style={styles.resultTextName}>{item.goods_name}</Text>
            <Text style={styles.resultTextPrice}>¥{item.shop_price}</Text>
            <Text style={styles.resultTextSale}>销量{item.sales_volume}</Text>
          </View>
        </TouchableOpacity>
      );
  };

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

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有匹配商品哦~</Text>
        </View>
    );
  }

  _createListHeader=(info)=>{
    if(info){
        return (
            <View style={{backgroundColor:'#fff',marginBottom:20}}>
                <ImageBackground source={{uri:info.brand_bg}} resizeMode='stretch' style={{
                    width:width,height:Math.floor(width * 120/350),
                    justifyContent:'center'
                }}>
                    <TouchableOpacity style={{flexDirection:'row',marginLeft:20}}
                        onPress={() => {this._brandDetail(info.brand_id)}}>
                        <View>
                            <Image source={{uri:info.brand_logo}} style={{width:60,height:60}}/>
                        </View>
                        <View style={{paddingTop:14,paddingLeft:20,}}>
                            <Text style={{color:'#fff',fontSize:18}}>{info.brand_name}</Text>
                            <Text style={{color:'#bbb',fontSize:14}}>共有{info.goods_num}件商品</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }else{
        return(
            <View></View>
        )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
            data={this.state.list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={()=>this._createListHeader(this.state.brandinfo)}
            ListFooterComponent={this._createListFooter}
            ListEmptyComponent={this._createEmptyView}
            numColumns={2}
            getItemLayout={(data,index)=>(
                {length: 100, offset: (100+2) * index, index}
            )}
            refreshing={this.state.isRefresh}
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.5}
          />
      </ScrollView>
    );
  }

  _detail = async (goods_id) => {
    this.props.navigation.navigate('GoodsDetail',{'goods_id':goods_id});
  };

  _search = async () => {
    this.page=1;
    this._getGoodsList();
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
    width:width*170/375,
  },
  resultImage:{
    width:width*170/375,
    height:width*170/375,
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
