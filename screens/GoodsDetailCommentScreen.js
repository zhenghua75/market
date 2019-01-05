import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
   } from 'react-native';

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

  _keyExtractor = (item, index) => item.id;

  state = {
    good_comment:[],
  };

  _renderItem = ({item, index, section}) => {
    return (
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}>
          <Text style={{fontSize:14,color: '#3f3f3f',margin:15,}}>{item.username}</Text>
          <Image source={{uri:item.user_picture}} style={{width:33,height:33,}}/>
          <View style={{width:5,height:44,backgroundColor: '#f5f5f5',marginLeft:12,}}/>
          <Text style={{fontSize:14,color: '#3f3f3f',margin:15,}}>{item.content}</Text>
        </TouchableOpacity>
      );
  };

  _getCatalog=async () =>{
    try {
      let response = await fetch(
        'http://jc.ynweix.com/api.php?app_key=E6E3D813-4809-4C98-8D34-A14C7C493A7C&method=dsc.category.list.get&format=json&page_size=10000'
      );
      let responseJson = await response.json();
      if(responseJson.error != 0){
        throw responseJson;
      }
      let list = responseJson.info.list;
      this.setState({list:list});
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount() {
    //this._getCatalog();
    const { navigation } = this.props;
    let good_comment = navigation.getParam('good_comment');
    let comment_all = navigation.getParam('comment_all');
    this.setState({
      good_comment:good_comment,
      comment_all:comment_all,
    });

  }

  render() {
    let comment_all = this.state.comment_all;

    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',
          borderBottomWidth:1,borderColor:'#e5e5e5',
          paddingVertical:15,
          marginHorizontal:12,
          }}>
          <View style={{backgroundColor:'rgb(255,142,1)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>全部（{comment_all.allmen}）</Text>
          </View>
          <View style={{backgroundColor:'rgb(251,191,118)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>好评（{comment_all.goodmen}）</Text>
          </View>
          <View style={{backgroundColor:'rgb(251,191,118)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>中评（{comment_all.middlemen}）</Text>
          </View>
          <View style={{backgroundColor:'rgb(251,191,118)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>差评（{comment_all.badmen}）</Text>
          </View>
        </View>
        <FlatList
          data={this.state.good_comment}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
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
});
