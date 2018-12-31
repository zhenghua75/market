import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  ImageBackground,
  AsyncStorage,
  FlatList
   } from 'react-native';
import Swiper from 'react-native-swiper';

import ApiPost from '../lib/ApiPost';

export default class ConstructionTeamDetailScreen extends React.Component {
  static navigationOptions = {
    title: '施工团队',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  constructor(props){
    super(props);
    this.state = {
        teaminfo:[]
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    let team_id = navigation.getParam('id');
    this._getConsteamInfo(team_id);
  }

  _getConsteamInfo=async (team_id) =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetConsteamInfo',
      'token':userToken,
      'team_id':team_id
    };
    let responseJson = await ApiPost(data);
    this.setState({
        teaminfo:responseJson.Data.teaminfo
    });
  };

  _keyExtractor = (item, index) => item.member_id;

  _createListItem = ({item}) => {
    return (
        <View style={{alignItems:'center',paddingTop:40,}}>
            <View style={{position:'absolute',top:0,zIndex:1}}>
                <Image source={{uri:item.member_logo}} style={{width:59,height:59,borderRadius:30,}}/>
            </View>
            <View style={{borderWidth:1,borderColor:'rgb(229,229,229)',
                width: Dimensions.get('window').width/2-20,alignItems:'center',paddingTop:30,
                }}>
                <Text style={{fontSize:15,color:'#3f3f3f',}}>{item.member_name}</Text>
                <Text style={{fontSize:14,color:'#888888',lineHeight:20,}}>{item.member_type_desc}</Text>
                <Text style={{fontSize:14,color:'#888888',height:180,padding:5,textAlignVertical:'center'}}>{item.member_desc}</Text>
            </View>
        </View>
    );
  }

  _separator = () => {
    return <View style={{height:20,}}/>;
  }

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有施工队成员哦~</Text>
        </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <Image source={{uri:this.state.teaminfo.team_logo}} style={{
              width: Dimensions.get('window').width,
              height: Math.floor(Dimensions.get('window').width * 240/702),
            }}/>
        </View>
        <View style={{backgroundColor:'#fff',padding:12,paddingBottom:60,marginBottom:12,}}>
          <View style={{borderBottomWidth:1,borderColor:'rgb(229,229,229)',}}>
            <Text style={{fontSize:18,color:'#3f3f3f',}}>{this.state.teaminfo.team_name}</Text>
            <View style={{paddingVertical:5,}}>
              <Text style={{fontSize:14,color:'#888888',lineHeight:20,}}>规模：{this.state.teaminfo.member_count}人</Text>
              <Text style={{fontSize:14,color:'#888888',lineHeight:20,}}>联系电话：{this.state.teaminfo.mobile}</Text>
            </View>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',margin:20,}}>
            <View style={{width:83,height:22,backgroundColor:'#ff8f00',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontSize:14,color:'#fff'}}>团队介绍</Text>
            </View>
            <View style={{paddingTop:20,}}>
              <Text style={{fontSize:14,color:'#888888',lineHeight:20,}}>{this.state.teaminfo.team_desc}</Text>
            </View>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',}}>
            <View style={{width:83,height:22,backgroundColor:'#ff8f00',alignItems:'center',justifyContent:'center',margin:20,}}>
              <Text style={{fontSize:14,color:'#fff'}}>成员介绍</Text>
            </View>
            <View style={{alignSelf:'stretch',}}>
              <FlatList
                data={this.state.teaminfo.member_list}
                keyExtractor={this._keyExtractor}
                renderItem={this._createListItem}
                numColumns={2}
                columnWrapperStyle={{justifyContent:'space-between'}}
                ItemSeparatorComponent={this._separator}
                contentContainerStyle={{marginTop:10,}}
                ListEmptyComponent={this._createEmptyView}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
              />
            </View>
          </View>
        </View>
        <View style={{padding:12,backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'rgb(229,229,229)',alignItems:'center',padding:12,}}>
            <View style={{width:5,height:25,backgroundColor:'rgb(255,142,1)',}}/>
            <Text style={{fontSize:18,color:'#ff8f00',marginLeft:12,}}>评论</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',padding:16,borderBottomWidth:1,borderColor:'rgb(229,229,229)',}}>
            <View style={{width:67,height:24,backgroundColor:'#ff8f00',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#fff'}}>全部(0)</Text>
            </View>
            <View style={{width:67,height:24,backgroundColor:'#fbc075',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#3f3f3f'}}>好评(0)</Text>
            </View>
            <View style={{width:67,height:24,backgroundColor:'#fbc075',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#3f3f3f'}}>中评(0)</Text>
            </View>
            <View style={{width:67,height:24,backgroundColor:'#fbc075',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#3f3f3f'}}>差评(0)</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(229,229,229)',
  },
});
