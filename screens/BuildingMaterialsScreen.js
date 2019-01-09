import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  AsyncStorage
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '建材',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state = {
    list:[],
  };

  _keyExtractor = (item, index) => item.cat_id+item.goods_id;

  _onPressItem = (goods_id) => {
    this.props.navigation.navigate('GoodsDetail',{'goods_id':goods_id});
  };

  _renderHeader = ({section: {cat_id,cat_name}}) => (
    <View style={{flexDirection:'row',flex:1,justifyContent: 'center',
        alignItems:'center',marginVertical:20,backgroundColor:'#F0A653',padding:20}}>
      <Text style={{fontWeight: 'bold',fontSize:16,color:'#fff'}}>{cat_name}</Text>
    </View>
  );

  _renderItem2 = ({item, index, section}) => {
    return (
      <FlatList
        data={item.data}
        renderItem={this._renderItem3}
        numColumns={2}
        getItemLayout={(data,index)=>(
            {length: 100, offset: (100+2) * index, index}
        )}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  _renderItem3 = ({item, index, section}) => {
    return (
      <TouchableOpacity style={styles.result} onPress={() => {this._onPressItem(item.goods_id)}}>
        <Image source={{uri:item.goods_thumb.Data}} style={styles.resultImage}/>
        <View style={{padding:12,}}>
          <Text style={styles.resultTextName}>{item.goods_name}</Text>
          <Text style={styles.resultTextPrice}>¥{item.shop_price}</Text>
          <Text style={styles.resultTextSale}>销量{item.sales_volume}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  componentWillMount() {
    this._getMaterialList();
  }

  render() {
    let listnew=this.state.list;
    for (var i = 0; i < listnew.length; i++) {
        listnew[i]['data'] = [{'data':listnew[i].data}];
    }
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image source={require('../assets/images/13建材首页/banner.png')} style={{width:width,
            height:Math.floor(width * 404/750),}}/>
        <SectionList
            renderItem={this._renderItem2}
            renderSectionHeader={this._renderHeader}
            sections={listnew}
            keyExtractor={(item, index) => item.cat_id+index}
            style={{flex:1,marginBottom:20,}}
        />
      </ScrollView>
    );
  }

  _getMaterialList=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetCatGoodsList',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    this.setState({
        list:responseJson.Data
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    //flexDirection:'row',
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
  result:{
    marginHorizontal:10,
    width:width*170/375,
  },
  resultImage:{
    width:width*170/375,
    height:width*170/375,
  },
  resultTextName:{
    fontSize:14,
    color:'#3F3F3F',
  },
  resultTextPrice:{
    fontSize:14,
    color:'#FF8F00',
  },
  resultTextSale:{
    fontSize:12,
    color:'#c7c7c7',
    textAlign:'right',
  },
});
