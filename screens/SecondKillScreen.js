import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  Button,
  Dimensions,
   } from 'react-native';

export default class SecondKillScreen extends React.Component {
  static navigationOptions = {
    title: '秒杀',
  };

  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item+index;

  _renderItem = ({item, index, section}) => (
    <View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image source={require('../assets/images/s1.png')} style={{width:90,height:90}}/>
        <View style={{}}>
          <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.name}</Text>
          <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.attr}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',}}>
              <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>{item.kill}</Text>
              <Text style={{width:44,textAlign:'center'}}>{item.price}</Text>
            </View>
            <Button title='马上抢' onPress={()=>{}}/>
          </View>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../assets/images/09搜索框+头部返回箭头等杂七杂八/图层60.png')}  style={styles.top}/>
        <FlatList
          data={[
            {id:1,name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',kill:38,price:58,num:3,sum:114}, 
            {id:2,name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',kill:38,price:58,num:3,sum:114}, 
            {id:3,name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',kill:38,price:58,num:3,sum:114}, 
            {id:4,name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',kill:38,price:58,num:3,sum:114}, 
          ]}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
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
  top:{
    width: Dimensions.get('window').width,
    height: Math.floor(Dimensions.get('window').width * 342/750),
  }
});
