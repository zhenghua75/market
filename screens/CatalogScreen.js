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
  AsyncStorage,
   } from 'react-native';

import { Constants } from 'expo';
import getApiUrl from '../constants/Api';
import ApiPost from '../lib/ApiPost';

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
    list1:[],
    list2:[],
  };

  _keyExtractor = (item, index) => item.cat_id;

  _onPressItem = (id: string) => {
    this.setState({selected:id});
    let list2=[];
    let cattop=[];
    for (var i = 0; i < this.state.list1.length; i++) {
        cattop[i]=this.state.list1[i]['cat_id'];
    }
    if(id==0){
        list2=this.state.list.filter((item) => { return item.parent_id != '0' && cattop.find((n)=>n==item.parent_id)!==undefined });
        for (var i = 0; i < list2.length; i++) {
            let list3 = this.state.list.filter((item) => { return item.parent_id == list2[i].cat_id});
            list2[i]['data'] = [{'data':list3}];
        }
    }else{
        list2 = this.state.list.filter((item) => { return item.parent_id == id});
        for (var i = 0; i < list2.length; i++) {
          let list3 = this.state.list.filter((item) => { return item.parent_id == list2[i].cat_id});
          list2[i]['data'] = [{'data':list3}];
        }
    }

    this.setState({list2:list2,});
  };

  _createListHeader = () => {
    let selected= 0 == this.state.selected;
    const textColor = selected?'#ff8f00':'#3f3f3f';
    const selectedline = selected? 3 : 0;
    return(
        <TouchableOpacity style={{padding:10,borderLeftColor:'#ff8f00',borderLeftWidth:selectedline}} onPress={() => this._onPressItem(0)}>
        <Text style={{fontSize:14,color: textColor}}>全部分类</Text>
        </TouchableOpacity>
    )
  };

  _renderItem = ({item, index, section}) => {
    let selected= item.cat_id==this.state.selected;
    const textColor = selected?'#ff8f00':'#3f3f3f';
    const selectedline = selected? 2 : 0;
    return (
        <TouchableOpacity style={{padding:10,borderLeftColor:'#ff8f00',borderLeftWidth:selectedline}} onPress={() => this._onPressItem(item.cat_id)}>
          <Text style={{fontSize:14,color: textColor,}}>{item.cat_name}</Text>
        </TouchableOpacity>
      );
  };

  _renderItem3 = ({item, index, section}) => {
    let img = <Image source={require('../assets/images/list.png')} style={{width:60,
          height:60,}}/>;
    if(item.touch_icon){
      img = <Image source={{uri:item.touch_icon}} style={{width:60,
          height:60,}}/>
    }
    return (
      <TouchableOpacity style={{alignItems:'center',
        justifyContent:'center',
        height:100,
        width:85,
        padding:12,
      }} onPress={() => this._goodsList(item.cat_id)}>
        {img}
        <Text style={{fontSize:12,
          color:'#888888',}}>{item.cat_name}</Text>
      </TouchableOpacity>
    );
  };

  _renderItem2 = ({item, index, section}) => {
    let cols = Math.floor((Dimensions.get('window').width-100)/80);
    return (
      <FlatList
        data={item.data}
        renderItem={this._renderItem3}
        numColumns={cols}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  _renderHeader = ({section: {cat_id,cat_name,touch_icon}}) => (
    <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent: 'center',
    alignItems:'center',marginTop:20,}} onPress={() => this._goodsList(cat_id)}>
      <Image source={{uri:touch_icon}} style={{width:30,height:30,}}/>
      <Text style={{fontWeight: 'bold',marginLeft:12,}}>{cat_name}</Text>
    </TouchableOpacity>
  );

  _getCatalog=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetCategory',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data;
    let list1 = list.filter(this._filter1);
    let cattop=[];
    for (var i = 0; i < list1.length; i++) {
        cattop[i]=list1[i]['cat_id'];
    }
    let list2 = list.filter((item)=>this._filter2(item,cattop));
    list2.forEach((element) => {
      let list3 = list.filter((item) => {return element.cat_id == item.parent_id;});
      element['data'] = [{'data':list3,}];
    });

    this.setState({list:list, list1:list1, list2:list2, });
  };

  _filter1=(item) => {
    return item.parent_id == '0';
  };

  _filter2=(item,toplist) => {
    return item.parent_id != '0' && toplist.find((n)=>n==item.parent_id)!==undefined;
  };

  componentWillMount() {
    this._getCatalog();
  }

  render() {
    return (
      <View style={{flexDirection:'row'}}>
        <View style={{backgroundColor:'#f5f5f5',width:100,borderRightWidth:1,borderRightColor:'#eeeeee'}}>
            <FlatList
                data={this.state.list1}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={this._createListHeader}
                contentContainerStyle={{alignItems:'stretch',backgroundColor:'#f5f5f5',}}
            />
        </View>
        <ScrollView style={styles.container}>
            <SectionList
                renderItem={this._renderItem2}
                renderSectionHeader={this._renderHeader}
                sections={this.state.list2}
                keyExtractor={(item, index) => item.cat_id}
                style={{flex:1,marginBottom:20,}}
            />
        </ScrollView>
      </View>
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
