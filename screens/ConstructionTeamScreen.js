import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';

import ApiPost from '../lib/ApiPost';

const {width, height} = Dimensions.get('window');

export default class ConstructionTeamScreen extends React.Component {
  static navigationOptions = {
    title: '施工队',
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
            onRefresh={() => this._onRefresh()}
            refreshing={this.state.isRefresh}
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.5}
        />
    );
  }

  _createListHeader(){
    return (
        <View style={{height:65,alignItems:'center',backgroundColor:'#fff'}}>
          <View style={{margin:12,height:36,
            width:width-24,
            flexDirection:'row',borderRadius:5,
          backgroundColor:'rgb(234,238,237)',
          alignItems:'center',
          justifyContent:'space-between',
        }}>
            <View style={{flexDirection:'row',padding:10}}>
              <Image source={require('../assets/images/00四个选项/发现.png')} style={{width:20,height:21,}}/>
              <Text>输入施工团队</Text>
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
    )
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

  _keyExtractor = (item, index) => item.team_id;

  _onPressItem = (id) => {
    this.props.navigation.navigate('ConstructionTeamDetail',{ 'id': id });
  };

  _createListItem = ({item}) => {
    return (
        <TouchableOpacity onPress={() => {this._onPressItem(item.team_id)}}>
        <View style={{marginHorizontal:12,marginVertical:20,backgroundColor:'#fff'}}>
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
  }

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有匹配施工队哦~</Text>
        </View>
    );
  }

  _getConsteamList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetConsteamList',
      'token':userToken,
      'size':'10',
      'page': this.page,
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data.list;
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
        this._getConsteamList();
    }
  };

  _onLoadMore(){
    if (!this.state.isLoadMore && this.totalpage>this.page){
        this.setState({
            isLoadMore : true
        });
        this.page = this.page + 1;
        this._getConsteamList();
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
    justifyContent:'center',
    alignItems:'center'
  },
  itemImages:{
    width:120,
    height:120,
    resizeMode:'stretch'
  },
});
