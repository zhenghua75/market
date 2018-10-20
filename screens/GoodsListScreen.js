import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Image, Text, 
  View, 
  TouchableOpacity,
  Dimensions,
    } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '商品列表',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{height:65,alignItems:'center',backgroundColor:'#fff'}}>
          <View style={{margin:12,height:36,
            width:Dimensions.get('window').width-24,
            flexDirection:'row',borderRadius:5,
          backgroundColor:'rgb(234,238,237)',
          alignItems:'center',
          justifyContent:'space-between',
        }}>
            <View style={{flexDirection:'row',padding:10}}>
              <Image source={require('../assets/images/00四个选项/发现.png')} style={{width:20,height:21,}}/>
              <Text style={{fontSize:12,color:'#999999',marginLeft:15,}}>输入商品名</Text>
            </View>
            <View style={{height:36,width:52,borderTopRightRadius:5,borderBottomRightRadius:5,
              backgroundColor:'rgb(255,142,1)',
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{color:'#fff'}}>搜索</Text>
            </View>
          </View>
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
