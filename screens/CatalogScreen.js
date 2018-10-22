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
   } from 'react-native';

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
    selected: (new Map(): Map<string, boolean>),
    list1:[{'cat_id':'0','parent_id':'0','cat_name':'没有',}],
    list2:[{'cat_id':'00','cat_name':'没有',}],
    list3:[{'cat_id':'000','cat_name':'没有',}],
  };

  _keyExtractor = (item, index) => item.cat_id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item, index, section}) => {
    //this._onPressItem(item.cat_id);
    //const textColor = this.state.selected[item.cat_id] ? '#ff8f00' : '#3f3f3f';
    return (
    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}>
      <View style={{width:5,height:44,backgroundColor:'#ff8f00',marginLeft:12,}}/>
      <Text style={{fontSize:14,color:'#ff8f00',margin:15,}}>{item.cat_name}</Text>
    </TouchableOpacity>
  )};

  _renderItem2 = ({item, index, section}) => {
    return (
    <TouchableOpacity style={styles.box} onPress={this._goodsList}>
      <Image source={require('../assets/images/03分类/1.png')} style={styles.img}/>
      <Text style={styles.txt}>{item.cat_name}</Text>
    </TouchableOpacity>
  )};

  _getCatalog=async () =>{
    try {
      let response = await fetch(
        'http://jc.ynweix.com/api.php?app_key=E6E3D813-4809-4C98-8D34-A14C7C493A7C&method=dsc.category.list.get&format=json&page_size=10000'
      );
      let responseJson = await response.json();
      if(responseJson.error != 0){
        throw responseJson;
      }
      let list1 = responseJson.info.list.filter(this._filter1);
      let list2 = responseJson.info.list.filter(this._filter2);
      this.setState({list1:list1,list2:list2,});
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
  _filter3 = (list,list1) => {
    let list2 = [];
    list.forEach((item,index) => {
      let found = list1.find(function(element) {
        return element.cat_id == item.parent_id;
      });
      if(found){
        list2.push(item);
      }
    })
    return list2;
  };

  componentWillMount() {
    this._getCatalog();
    // [
    //           {id:'1',name:'五金工具'}, 
    //           {id:'2',name:'建筑耗材'}, 
    //         ]
  }
  render() {
    let cols = Math.floor((Dimensions.get('window').width-200)/50);
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={{width:200,backgroundColor:'#f5f5f5'}}>
          <FlatList
            data={this.state.list1}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent:'flex-start',flexWrap:'wrap'}}>
          <FlatList horizontal={false} numColumns={cols}
            data={this.state.list2}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem2}
          />
        </View>
      </ScrollView>
    );
  }

  _goodsList = async () => {
    this.props.navigation.navigate('GoodsList');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexDirection:'row',
  },
  box:{
    alignItems:'center',
    justifyContent:'center',
    height:80,
    width:80,
  },
  img:{
    width:49,
    height:36,
  },
  txt:{
    fontSize:12,
    color:'#88888888',
  },
});
