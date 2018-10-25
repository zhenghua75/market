import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
   } from 'react-native';

export default class GoodsDetailCommentScreen extends React.Component {
  static navigationOptions = {
    title: '商品详情',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  _keyExtractor = (item, index) => item.cat_id;

  state = {
    list:[],
  };

  _renderItem = ({item, index, section}) => {
    let selected= item.cat_id==this.state.selected;
    const viewColor = selected?'#ff8f00':'#f5f5f5';
    const textColor = selected?'#ff8f00':'#3f3f3f';
    return (
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}} onPress={() => this._onPressItem(item.cat_id)}>
          <View style={{width:5,height:44,backgroundColor: viewColor,marginLeft:12,}}/>
          <Text style={{fontSize:14,color: textColor,margin:15,}}>{item.cat_name}</Text>
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
    this._getCatalog();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',padding:12,}}>
          <TouchableOpacity style={{flex:1,}} onPress={this._goodsDetail}>
            <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'center',}}>商品</Text>
          </TouchableOpacity>
          <Text style={{fontSize:16,color:'#ff8f00',textAlign:'center',flex:1,}}>评论</Text>
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',
          borderBottomWidth:1,borderColor:'#e5e5e5',
          paddingVertical:15,
          marginHorizontal:12,
          }}>
          <View style={{backgroundColor:'rgb(255,142,1)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>全部（0）</Text>
          </View>
          <View style={{backgroundColor:'rgb(251,191,118)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>好评（0）</Text>
          </View>
          <View style={{backgroundColor:'rgb(251,191,118)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>中评（0）</Text>
          </View>
          <View style={{backgroundColor:'rgb(251,191,118)',borderRadius:20,padding:12,}}>
            <Text style={{fontSize:14,color:'#fff'}}>差评（0）</Text>
          </View>
        </View>
        <FlatList
          data={this.state.list}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }

  _goodsDetail = async () => {
    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
