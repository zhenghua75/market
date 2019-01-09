import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  Dimensions,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import ApiPost from '../lib/ApiPost';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

export default class BrandScreen extends React.Component {
  static navigationOptions = {
    title: '品牌',
  };

  state = {
    top:null,
    center:[],
    list2:[],
    today:'',
    brandheadbg:'',
    'visibleSwiper': false,
  };

  componentWillMount() {
    this._getBrandList();
  }

  _getBrandList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetBrandList',
      'token':userToken
    };
    let responseJson = await ApiPost(data);
    this.setState({
        top:responseJson.Data.top[0],
        center:responseJson.Data.center,
        list2:responseJson.Data.list2,
        today:responseJson.Data.today,
        brandheadbg:responseJson.Data.brandheadbg,
        visibleSwiper: true
    });
  };

  _keyExtractor = (item, index) => item.brand_id;

  _renderItem = ({item, index, section}) => (
    <TouchableOpacity style={{padding:5,borderWidth:0.5,borderColor:'#eeeeee'}}
        onPress={() => {this._brandDetail(item.brand_id)}}>
      <Image source={{uri:item.brand_logo}} resizeMode='contain' style={{width:(width-40)*1/4,height:(width-40)*1/4}}/>
    </TouchableOpacity>
  );

  _goodDetail = async (goods_id) => {
    this.props.navigation.navigate('GoodsDetail',{'goods_id':goods_id});
  };

  _brandDetail = async (brandid) => {
    this.props.navigation.navigate('BrandDetail',{'brand_id':brandid});
  };

  render() {
    let headbg=require('../assets/images/brand_header_bg.jpg');
    if(this.state.top){
        headbg={uri:this.state.brandheadbg};
    }

    let topimg1=<View></View>;
    let topbrandname='';
    let topgoods=<View></View>;
    let swiper=null;

    if(this.state.top){
        topimg1=<View>
            <Image source={{uri:this.state.top.goods[0].goods_thumb}} style={{width:140,height:125,}}/>
            </View>;
        topbrandname=this.state.top.brand_name;
        let topgood1=this.state.top.goods[1];
        let topgood2=this.state.top.goods[2];
        topgoods=<View style={{flexDirection:'row',marginTop:155-Math.floor((width) * 240/902)+20,
            backgroundColor:'#fff',paddingVertical:20,paddingHorizontal:12,justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.result} onPress={() => {this._goodDetail(topgood1.goods_id)}}>
            <Image source={{uri:topgood1.goods_thumb}} style={styles.resultImage}/>
            <View style={{paddingTop:12,paddingLeft:10,}}>
                <Text style={styles.resultTextName}>{topgood1.goods_name}</Text>
                <Text style={styles.resultTextPrice}>¥{topgood1.shop_price}</Text>
                <Text style={styles.resultTextSale}>销量{topgood1.sales_volume}</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.result} onPress={() => {this._goodDetail(topgood2.goods_id)}}>
            <Image source={{uri:topgood2.goods_thumb}} style={styles.resultImage}/>
            <View style={{paddingTop:12,paddingLeft:10,}}>
                <Text style={styles.resultTextName}>{topgood2.goods_name}</Text>
                <Text style={styles.resultTextPrice}>¥{topgood2.shop_price}</Text>
                <Text style={styles.resultTextSale}>销量{topgood2.sales_volume}</Text>
            </View>
            </TouchableOpacity>
        </View>;
    }
    
    if (this.state.visibleSwiper && this.state.center) {
        let list=this.state.center;
        let obj = [];
        for (var i = 0; i < list.length; i++) {
          let goods=list[i].goods;
          let brandid=list[i].brand_id;
          obj.push(<View key={i} style={{backgroundColor:'#fff',}}>
                <ImageBackground source={{uri: list[i].brand_bg}} resizeMode='stretch' style={{
                    width:width-20,height:Math.floor((width-20) * 120/350),
                    justifyContent:'center'
                }}>
                    <TouchableOpacity style={{flexDirection:'row',marginLeft:20}}
                        onPress={() => {this._brandDetail(brandid)}}>
                        <View>
                            <Image source={{uri:list[i].brand_logo}} style={{width:60,height:60}}/>
                        </View>
                        <View style={{paddingTop:14,paddingLeft:20,}}>
                            <Text style={{color:'#fff',fontSize:18}}>{list[i].brand_name}</Text>
                            <Text style={{color:'#bbb',fontSize:14}}>共有{list[i].goods_num}件商品</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{flexDirection:'row',paddingVertical:20,justifyContent:'space-around'}}>
                    {goods.map((itemgood, keygood) => {
                    return (
                        <TouchableOpacity key={keygood} style={styles.result} onPress={() => {this._goodDetail(itemgood.goods_id)}}>
                        <Image source={{uri:itemgood.goods_thumb}} style={styles.resultImage}/>
                        <View style={{paddingTop:12,paddingLeft:10,}}>
                            <Text style={styles.resultTextName}>{itemgood.goods_name}</Text>
                            <Text style={styles.resultTextPrice}>¥{itemgood.shop_price}</Text>
                            <Text style={styles.resultTextSale}>销量{itemgood.sales_volume}</Text>
                        </View>
                        </TouchableOpacity>
                    )})}
                </View>
            </View>
          );
        }
        swiper = <Swiper dotColor={'#999999'} activeDotColor={'#ff8f00'} 
            removeClippedSubviews={false} autoplay={false}
            style={{backgroundColor:'#fff'}}
            width={width-20} height={Math.floor((width-20) * 120/300)+(width-20)*170/375+120}>
            {obj.map((item, key) => {return item;})}
        </Swiper>;
    } else {
        swiper = <View width={width-20} height={Math.floor((width-20) * 120/300)+(width-20)*170/375+120}></View>;
    }

    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={headbg} resizeMode='stretch'
            style={{width:width,height:Math.floor((width) * 240/902),}}>
            <View style={{flexDirection:'row',marginTop:30,marginLeft:20,}}>
                {topimg1}
                <View style={{paddingTop:14,paddingLeft:20,}}>
                    <Text style={{color:'#fff',fontSize:18}}>今日最大牌</Text>
                    <Text style={{color:'#999999',fontSize:14}}>每日精选 品牌大促</Text>
                    <TouchableOpacity style={{marginTop:20}} onPress={() => {this._brandDetail(this.state.top.brand_id)}}>
                        <Text style={{lineHeight:20,color:'#aaa',fontSize:14}}>日期：{this.state.today}</Text>
                        <Text style={{lineHeight:20,color:'#333333',fontSize:14}}>品牌：{topbrandname}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
        {topgoods}
        <View style={{marginTop:15,backgroundColor:'#fff',justifyContent:'center'}}>
            <Text style={{fontSize:14,lineHeight:50,paddingLeft:12}}>热门大牌</Text>
        </View>
        <View style={{padding:10}}>
            {swiper}
        </View>
        <View style={{marginTop:15,backgroundColor:'#fff',justifyContent:'center',paddingBottom:20,marginBottom:20}}>
            <Text style={{fontSize:14,lineHeight:50,paddingLeft:12}}>推荐大牌</Text>
            <FlatList
                data={this.state.list2}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                numColumns={4}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234,238,237)',
  },
  result:{
    width:(width-20)*170/375,
  },
  resultImage:{
    width:(width-20)*170/375,
    height:(width-20)*170/375,
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
