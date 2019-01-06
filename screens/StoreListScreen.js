import React from 'react';
import { 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  AsyncStorage,
  ImageBackground
} from 'react-native';

import ApiPost from '../lib/ApiPost';

const {width, height} = Dimensions.get('window');

export default class DecorationStrategyListScreen extends React.Component {
  static navigationOptions = {
    title: '品质店铺',
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
        data:[],
        isLoadMore:false
    }
  }

  componentWillMount() {
    this._getStoreList();
  }

  _getStoreList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetStoreList',
      'token':userToken,
      'size':'1',
      'page': this.page,
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data.list;
    this.totalpage=responseJson.Data.totalPage;
    if(this.page===1){
        this.setState({
            data:list,
            isLoadMore:false
        });
    }else{
        this.setState({
            isLoadMore : false,
            data: this.state.data.concat(list),
        });
    }
  };

  _keyExtractor = (item, index) => item.shop_id;

  _onPressItem = (id) => {
    this.props.navigation.navigate('Store',{'shop_id':id});
  };

  _onLoadMore(){
    if (!this.state.isLoadMore && this.totalpage>this.page){
        this.setState({
            isLoadMore : true
        });
        this.page = this.page + 1;
        this._getStoreList();
    }
  }

  _createListItem = ({item}) => {
    return (
        <TouchableOpacity onPress={() => {this._onPressItem(item.user_id)}}>
        <View style={{marginHorizontal:12,marginVertical:20,backgroundColor:'#fff'}}>
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

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有店铺哦~</Text>
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
    return (
        <FlatList
            style={styles.container}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._createListItem}
            ListEmptyComponent={this._createEmptyView}
            ListFooterComponent={this._createListFooter}
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.5}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234,238,237)',
  },
  footerView:{
    width:width,
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
  itemImages:{
    width:120,
    height:120,
    resizeMode:'stretch'
  },
});
