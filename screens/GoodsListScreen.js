import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View, TouchableOpacity  } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '商品列表',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Image source={require('../assets/images/01首页部分/搜索.png')} style={styles.searchBoxImage}/>
          <Text style={styles.boxText}>输入商品名</Text>
          <TouchableOpacity style={styles.searchBoxBtn}>
            <Text style={styles.searchBoxBtnText}>搜索</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexWrap:'wrap',flexDirection:'row',}}>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
          <View style={styles.result}>
            <Image source={require('../assets/images/05商品/商品.png')} style={styles.resultImage}/>
            <Text style={styles.resultTextName}>远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单</Text>
            <Text style={styles.resultTextPrice}>¥38</Text>
            <Text style={styles.resultTextSale}>销量666</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  boxText:{
    flex:1,
  },
  result:{
    marginHorizontal:10,
    width:170,
  },
  resultImage:{
    width:170,
    height:170,
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
