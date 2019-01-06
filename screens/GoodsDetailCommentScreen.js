import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class GoodsDetailCommentScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle:<View style={{flexDirection:'row',justifyContent:'center',alignItems:'stretch',
        flex:1,alignSelf:'stretch',}}>
        <TouchableOpacity style={{justifyContent:'center'}} 
            onPress={()=>navigation.goBack()}>
            <Text style={{color:'#444444',fontSize:18}}>商品</Text>
        </TouchableOpacity>
        <View style={{marginLeft:30,borderBottomColor:'#FF8928',borderBottomWidth:3,justifyContent:'center'}}>
            <Text style={{color:'#FF8928',fontSize:18,paddingTop:3}}>评论</Text>
        </View>
        </View>,
  });

  constructor(props){
    super(props);
    this.page = 1;
    this.totalpage = 0;
    this.state = {
        data:[],
        isLoadMore:false,
        commentAll:{},
        rank:'all',
        good_id:0,
    }
  }

  _keyExtractor = (item, index) => item.id;

  _createListItem = ({item, index, section}) => {
    let pictures=item.thumb;
    if(pictures==0){
        return (
            <View style={{padding:12}}>
              <View style={{flexDirection:'row',alignItems:'center',}}>
                <Image source={{uri:item.user_picture}} style={{width:33,height:33,}}/>
                <Text style={{fontSize:14,color: '#3f3f3f',paddingLeft:20}}>{item.username}</Text>
              </View>
              <Text style={{fontSize:14,color: '#888888',paddingTop:10}}>{item.add_time}</Text>
              <Text style={{fontSize:14,color: '#3f3f3f',paddingVertical:10}}>{item.content}</Text>
            </View>
          );
    }else{
        return (
            <View style={{padding:12}}>
              <View style={{flexDirection:'row',alignItems:'center',}}>
                <Image source={{uri:item.user_picture}} style={{width:33,height:33,}}/>
                <Text style={{fontSize:14,color: '#3f3f3f',paddingLeft:20}}>{item.username}</Text>
              </View>
              <Text style={{fontSize:14,color: '#888888',paddingTop:10}}>{item.add_time}</Text>
              <View style={{flexDirection:'row',paddingTop:10,flexWrap:'wrap',alignItems:'center'}}>
                {pictures.map((item2, key) => {
                    return(
                        <Image key={key} source={{uri:item2}} style={{width:60,height:60,margin:5,}}/>
                    )
                })}
              </View>
              <Text style={{fontSize:14,color: '#3f3f3f',paddingVertical:10}}>{item.content}</Text>
            </View>
        );
    }
  };

  componentWillMount() {
    const { navigation } = this.props;
    let good_id = navigation.getParam('good_id');
    this.setState({good_id:good_id});
    this._getCommentsList();
  }

  _getCommentsList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetGoodComments',
      'token':userToken,
      'size':'10',
      'page': this.page,
      'good_id':this.state.good_id,
      'rank':this.state.rank
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data.comments;
    this.totalpage=responseJson.Data.totalPage;
    if(this.page==1){
        this.setState({
            data:list,
            isLoadMore:false,
            commentAll:responseJson.Data.comment_all,
        });
    }else{
        this.setState({
            isLoadMore : false,
            data: this.state.data.concat(list),
            commentAll:responseJson.Data.comment_all,
        });
    }
  };

  _changeRank(){
    this.page=1;
    this._getCommentsList();
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

  _createEmptyView(){
    return (
        <View style={{alignItems:'center',marginTop:50,}}>
            <Image source={require('../assets/images/05商品/暂无匹配.png')} style={{width:44,height:44,}}/>
            <Text style={{fontSize:14,color:'#999999',marginTop:20}}>暂时没有匹配评论哦~</Text>
        </View>
    );
  }

  _createItemSeparator(){
      return (
        <View style={{height:8,backgroundColor:'#eeeeee'}}></View>
      );
  }

  _onLoadMore(){
    const { navigation } = this.props;
    let good_id = navigation.getParam('good_id');
    if (!this.state.isLoadMore && this.totalpage>this.page){
        this.setState({
            isLoadMore : true
        });
        this.page = this.page + 1;
        this._getCommentsList();
    }
  }

  render() {
    let tab1bgcolor='rgb(251,191,118)';
    let tab2bgcolor='rgb(251,191,118)';
    let tab3bgcolor='rgb(251,191,118)';
    let tab4bgcolor='rgb(251,191,118)';
    if(this.state.rank=='all'){
        tab1bgcolor='rgb(255,142,1)';
    }else if(this.state.rank=='good'){
        tab2bgcolor='rgb(255,142,1)';
    }else if(this.state.rank=='middle'){
        tab3bgcolor='rgb(255,142,1)';
    }else if(this.state.rank=='bad'){
        tab4bgcolor='rgb(255,142,1)';
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',
          borderBottomWidth:1,borderColor:'#e5e5e5',
          paddingVertical:15,
          marginHorizontal:12,
          }}>
          <TouchableOpacity style={{backgroundColor:tab1bgcolor,borderRadius:20,paddingHorizontal:8,paddingVertical:5,}}
            onPress={()=>{this.setState({rank:'all'});this._changeRank();}}>
            <Text style={{fontSize:14,color:'#fff'}}>全部({this.state.commentAll.allmen})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:tab2bgcolor,borderRadius:20,paddingHorizontal:8,paddingVertical:5,}}
            onPress={()=>{this.setState({rank:'good'});this._changeRank();}}>
            <Text style={{fontSize:14,color:'#fff'}}>好评({this.state.commentAll.goodmen}）</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:tab3bgcolor,borderRadius:20,paddingHorizontal:8,paddingVertical:5,}}
            onPress={()=>{this.setState({rank:'middle'});this._changeRank();}}>
            <Text style={{fontSize:14,color:'#fff'}}>中评({this.state.commentAll.middlemen})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:tab4bgcolor,borderRadius:20,paddingHorizontal:8,paddingVertical:5,}}
            onPress={()=>{this.setState({rank:'bad'});this._changeRank();}}>
            <Text style={{fontSize:14,color:'#fff'}}>差评({this.state.commentAll.badmen})</Text>
          </TouchableOpacity>
        </View>
        <FlatList
            style={styles.container}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._createListItem}
            ListEmptyComponent={this._createEmptyView}
            ListFooterComponent={this._createListFooter}
            ItemSeparatorComponent={this._createItemSeparator}
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
  footerView:{
    width:width,
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
});
