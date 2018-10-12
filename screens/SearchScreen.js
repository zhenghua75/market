import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View, TouchableOpacity  } from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: '发现',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.searchBox}>
          <Image source={require('../assets/images/01首页部分/搜索.png')} style={styles.searchBoxImage}/>
          <Text style={styles.searchBoxText}>输入商品名</Text>
          <TouchableOpacity style={styles.searchBoxBtn}>
            <Text style={styles.searchBoxBtnText}>搜索</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchResult}>
          <Image source={require('../assets/images/s1.png')} style={styles.searchResultImage}/>
          <View style={styles.searchResultTextBox}>
            <Text style={styles.searchResultTextBoxName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.searchResultTextBoxAttr}>100米硬线 蓝色 100米/卷</Text>
            <View style={styles.searchResultTextBoxPriceArea}>
              <Text style={styles.searchResultTextBoxPrice}>¥38</Text>
              <View style={styles.shop}>
                <Image source={require('../assets/images/04订单/店铺.png')} style={styles.shopImage}/>
                <Text style={styles.shopName}>魔都CV大大</Text>
                <Image source={require('../assets/images/04订单/右箭头.png')} style={styles.shopArrow}/>
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  searchBox:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  searchBoxText:{
    flex:1,
  },
  searchResult:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'#000000',
    marginHorizontal:15,
    paddingVertical:15,
  },
  searchResultImage:{
    width:90,
    height:90,
  },
  searchResultTextBox:{
    marginLeft:22,
  },
  searchResultTextBoxName:{
    fontSize:14,
    color:'#3F3F3F',
  },
  searchResultTextBoxAttr:{
    fontSize:12,
    color:'#C7C7C7',
    marginTop:8,
  },
  searchResultTextBoxPriceArea:{
    flexDirection:'row',
    marginTop:13,
    justifyContent: 'space-between',
  },
  searchResultTextBoxPrice:{
    fontSize:14,
    color:'#FF8F00',
    flex:0.3,
  },
  shop:{
    flexDirection:'row',
    flex:0.7,
  },
  shopImage:{
    height:15,
    width:15,
  }, 
  shopName:{
    fontSize:12,
    color:'#3F3F3F',
    marginLeft:5,
    marginRight:7
  },
  shopArrow:{
    width:6,
    height:12,
  },
});
