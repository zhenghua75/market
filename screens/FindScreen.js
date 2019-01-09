import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Image, 
  Text, 
  View, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  AsyncStorage,
  ImageBackground
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '发现',
     headerTitleStyle:{
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
        data:[],
        isRefresh:false,
        isLoadMore:false
    }
  }

  componentWillMount() {
    this._onRefresh();
  }

  render() {
    return (
        <FlatList
            style={styles.container}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._createListItem}
            ListEmptyComponent={this._createEmptyView}
            ListHeaderComponent={this._createListHeader}
            ListFooterComponent={this._createListFooter}
            ItemSeparatorComponent={this._separator}
            onRefresh={() => this._onRefresh()}
            refreshing={this.state.isRefresh}
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.5}
        />
    );
  }

  _separator = () => {
    return <View style={{height:30,}}/>;
  }
  
  _createListHeader = () => {
    return <View style={{height:20,}}/>;
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

  _keyExtractor = (item, index) => item+index;

  _onPressItemTeam = (id) => {
    this.props.navigation.navigate('ConstructionTeamDetail',{ 'id': id });
  };

  _onPressItemStore = (id) => {
    this.props.navigation.navigate('Store',{ 'shop_id': id });
  };

  _onPressItemGood = (id) => {
    this.props.navigation.navigate('GoodsDetail',{ 'goods_id': id });
  };

  _createListItem = ({item}) => {
    if(item.distype=='consteam'){
        return (
            <TouchableOpacity onPress={() => {this._onPressItemTeam(item.team_id)}}>
            <View style={{marginHorizontal:12,backgroundColor:'#fff'}}>
                <ImageBackground source={{uri:item.team_logo}} style={{
                    width:width-24,
                    height:Math.floor((width-24) * 240/702),
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <Image source={{uri:item.logo_thumb}} style={{width:70,height:70,}}/>
                </ImageBackground>
                <Text style={{textAlign:'center',fontSize:18,color:'#3f3f3f',margin:10,}}>{item.team_name}</Text>
                <View style={{marginHorizontal:10,marginVertical:20,}}>
                    <View style={{flexDirection:'row',marginVertical:6,}}>
                        <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>人员规模：</Text>
                        <Text style={{fontSize:16,color:'#3f3f3f',marginHorizontal:20,}}>{item.member_count}人</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:6,}}>
                        <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>所在地区：</Text>
                        <Text style={{fontSize:16,color:'#3f3f3f',marginHorizontal:20,}}>{item.province} {item.city} {item.district}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:6,}}>
                        <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>手机号：</Text>
                        <Text style={{fontSize:16,color:'#3f3f3f',marginHorizontal:20,}}>{item.mobile}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:6,}}>
                        <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>简述：</Text>
                        <View style={{flex:1,overflow:'hidden'}}>
                            <Text style={{fontSize:16,color:'#3f3f3f',marginHorizontal:20,height:38,}}>{item.team_desc}</Text>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    }else if(item.distype=='good'){
        return (
            <TouchableOpacity style={styles.result} onPress={() => {this._onPressItemGood(item.goods_id)}}>
              <Image source={{uri:item.goods_img.Data}} style={styles.resultImage}/>
              <View style={{padding:12,}}>
                <Text style={styles.resultTextName}>{item.goods_name}</Text>
                <Text style={styles.resultTextPrice}>¥{item.shop_price}</Text>
                <Text style={styles.resultTextSale}>销量{item.sales_volume}</Text>
              </View>
            </TouchableOpacity>
          );
    }else{
        return (
            <TouchableOpacity onPress={() => {this._onPressItemStore(item.user_id)}}>
            <View style={{marginHorizontal:12,backgroundColor:'#fff'}}>
                <Image source={{uri:item.street_thumb}} style={{
                    width:width-24,
                    height:Math.floor((width-24) * 240/702),
                }}/>
                <View style={{flexDirection:'row', alignItems:'center',padding:14}}>
                    <Image source={{uri:item.shop_logo}} style={{width:60,height:60,}}/>
                    <Text style={{fontSize:14,color:'#3f3f3f',paddingLeft:20}}>{item.shop_name}</Text>
                </View>
            </View>
            </TouchableOpacity>
          );
    }
  }

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有新发现哦~</Text>
        </View>
    );
  }

  _getDiscoveryList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetDiscoveryList',
      'token':userToken,
      'page': this.page,
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data.Data;
    this.totalpage=responseJson.Data.totalPage;
    if(this.page===1){
        this.setState({
            data:list,
            isRefresh:false,
            isLoadMore:false
        });
    }else{
        this.setState({
            isLoadMore : false,
            data: this.state.data.concat(list),
            isRefresh:false
        });
    }
  };

  _onRefresh=()=>{
    if(!this.state.isRefresh){
        this.page = 1;
        this.setState({
            isRefresh : true
        });
        this._getDiscoveryList();
    }
  };

  _onLoadMore(){
    if (!this.state.isLoadMore && this.totalpage>this.page){
        this.setState({
            isLoadMore : true
        });
        this.page = this.page + 1;
        this._getDiscoveryList();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234,238,237)',
  },
  headView:{
    width:width,
    height:100,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  footerView:{
    width:width,
    height:40,
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  itemImages:{
    width:120,
    height:120,
    resizeMode:'stretch'
  },
  result:{
    marginHorizontal:12,
    width:width-24,
    backgroundColor:'#fff',
  },
  resultImage:{
    width:width-24,
    height:Math.floor((width-24) * 240/400),
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
