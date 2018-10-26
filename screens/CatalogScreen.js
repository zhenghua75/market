import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
   } from 'react-native';

import { Constants } from 'expo';
import getApiUrl from '../constants/Api';

export default class CatalogScreen extends React.Component {
  static navigationOptions = {
    title: '分类',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state = {
    selected:'0',
    list:[],
    list1:[{'cat_id':'0','parent_id':'0','cat_name':'没有',}],
    list2:[{'cat_id':'00','cat_name':'没有','data':[{'cat_name':'没有','data':[]}]}],
  };

  _keyExtractor = (item, index) => item.cat_id;

  _onPressItem = (id: string) => {
    this.setState({selected:id});
    let list2 = this.state.list.filter((item) => { return item.parent_id == id});
    for (var i = 0; i < list2.length; i++) {
      let list3 = this.state.list.filter((item) => { return item.parent_id == list2[i].cat_id});
      list2[i]['data'] = [{'data':list3}];
    }
    this.setState({list2:list2,});
  };

  _renderItem = ({item, index, section}) => {
    let selected= item.cat_id==this.state.selected;
    const viewColor = selected?'#ff8f00':'#f5f5f5';
    const textColor = selected?'#ff8f00':'#3f3f3f';
    const { manifest } = Constants;
    return (
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',padding:12,}} onPress={() => this._onPressItem(item.cat_id)}>
          <View style={{width:5,height:44,backgroundColor: viewColor,}}/>
          <Image source={{uri:manifest.extra.imageServer+item.touch_icon}} style={{width:22,height:22,marginLeft:12,}}/>
          <Text style={{fontSize:14,color: textColor,marginLeft:12,width:90}}>{item.cat_name}</Text>
        </TouchableOpacity>
      );
  };

  _renderItem3 = ({item, index, section}) => {
    const { manifest } = Constants;
    return (
      <TouchableOpacity style={{alignItems:'center',
        justifyContent:'center',
        height:80,
        width:80,
        padding:12,
      }} onPress={() => this._goodsList(item.cat_id)}>
        <Image source={{uri:manifest.extra.imageServer+item.touch_icon}} style={{width:49,
          height:36,}}/>
        <Text style={{fontSize:12,
          color:'#888888',}}>{item.cat_name}</Text>
      </TouchableOpacity>
    );
  };

  _renderItem2 = ({item, index, section}) => {
    let cols = Math.floor((Dimensions.get('window').width-180)/80);
    return (
      <FlatList
        data={item.data}
        renderItem={this._renderItem3}
        numColumns={cols}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  _renderHeader = ({section: {cat_name,touch_icon}}) => (
    <View style={{flexDirection:'row',flex:1,justifyContent: 'center',alignItems:'center',}}>
      <Image source={{uri:Constants.manifest.extra.imageServer+touch_icon}} style={{width:22,height:22,}}/>
      <Text style={{fontWeight: 'bold',marginLeft:12,}}>{cat_name}</Text>
    </View>
  );

  

  _getCatalog=async () =>{
    try {
      let url = getApiUrl({'method':'dsc.category.list.get','page_size':10000});
      let response = await fetch(url);
      let responseJson = await response.json();
      if(responseJson.error != 0){
        throw responseJson;
      }
      let list = responseJson.info.list;
      let list1 = list.filter(this._filter1);
      let list2 = list.filter(this._filter2);
      list2.forEach((element) => {
        let list3 = list.filter((item) => {return element.cat_id == item.parent_id;});
        element['data'] = [{'data':list3,}];
      });
      this.setState({list:list, list1:list1, list2:list2, });
    } catch (error) {
      console.error(error);
    }
  };

  _filter1=(item) => {
    return item.parent_id == '0';
  };

  _filter2=(item) => {
    return item.parent_id != '0';
  };

  componentWillMount() {
    this._getCatalog();
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexDirection:'row',}}>
        <View style={{backgroundColor:'#f5f5f5',width:150,}}>
          <FlatList
            data={this.state.list1}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            style={{backgroundColor:'#f5f5f5',flex:1,}}
          />
        </View>
        <SectionList
            renderItem={this._renderItem2}
            renderSectionHeader={this._renderHeader}
            sections={this.state.list2}
            keyExtractor={(item, index) => item.cat_id}
            style={{flex:1,}}
          />
      </ScrollView>
    );
  }

  _goodsList = async (cat_id) => {
    this.props.navigation.navigate('GoodsList',{'cat_id':cat_id});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
