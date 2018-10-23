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
    return (
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}} onPress={() => this._onPressItem(item.cat_id)}>
          <View style={{width:5,height:44,backgroundColor: viewColor,marginLeft:12,}}/>
          <Text style={{fontSize:14,color: textColor,margin:15,}}>{item.cat_name}</Text>
        </TouchableOpacity>
      );
  };

  _renderItem3 = ({item, index, section}) => {
    if(item.cat_icon){
      console.log(item.cat_icon);
    }
    return (
      <TouchableOpacity style={styles.box} onPress={() => this._goodsList(item.cat_id)}>
        <Image source={require('../assets/images/03分类/1.png')} style={styles.img}/>
        <Text style={styles.txt}>{item.cat_name}</Text>
      </TouchableOpacity>
    );
  };

  _renderItem2 = ({item, index, section}) => {
    let cols = Math.floor((Dimensions.get('window').width-200)/50);
    return (
      <FlatList
        data={item.data}
        renderItem={this._renderItem3}
        numColumns={cols}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  _renderHeader = ({section: {cat_name}}) => (
    <View style={{flexDirection:'row',flex:1,justifyContent: 'center',}}>
      <Text style={{fontWeight: 'bold'}}>{cat_name}</Text>
    </View>
  );

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
          <SectionList
            renderItem={this._renderItem2}
            renderSectionHeader={this._renderHeader}
            sections={this.state.list2}
            keyExtractor={(item, index) => item.cat_id}
          />
        </View>
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
    color:'#888888',
  },
});
