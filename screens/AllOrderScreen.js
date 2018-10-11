import React from 'react';
import {
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  SectionList,
  Button,
   } from 'react-native';

export default class AllOrderScreen extends React.Component {
 
  static navigationOptions = ({navigation}) => ({
    title: '我的订单',
    headerRight: (
      <TouchableOpacity style={{width:44,height:44,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate('SearchOrder')}>
              <Image source={require('../assets/images/09搜索框+头部返回箭头等杂七杂八/搜索.png')} />
            </TouchableOpacity>
    ),
  });

  _renderItem = ({item, index, section}) => (
    <View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image source={require('../assets/images/s1.png')} style={{width:90,height:90}}/>
        <View style={{}}>
          <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.name}</Text>
          <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.attr}</Text>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>{item.price}</Text>
            <Text style={{width:44,textAlign:'center'}}>X{item.num}</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Text>共{item.num}件商品 小计：</Text>
        <Text>{item.sum}</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Button title='取消订单' onPress={()=>{}}/>
        <Button title='付款' onPress={()=>{}}/>
      </View>
    </View>
  );

  _renderHeader = ({section: {title}}) => (
    <View style={{flexDirection:'row'}}>
      <Image source={require('../assets/images/04订单/店铺.png')} />
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <Image source={require('../assets/images/04订单/右箭头.png')} />
    </View>
  );
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#ff8f00'}}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>代付款</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>待发货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>待收货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>待评价</Text>
          </TouchableOpacity>
        </View>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          sections={[
            {title: '魔都CV大大1', data: [{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3,sum:114}]},
            {title: '魔都CV大大2', data: [{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3,sum:114},{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3,sum:114}]},
            {title: '魔都CV大大3', data: [{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3,sum:114}]},
          ]}
          keyExtractor={(item, index) => item + index}
        />
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
});
