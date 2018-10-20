import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
   } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '攻略',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{padding:12,}}>
        <View style={{padding:12,borderBottomWidth:1,borderColor:'#e5e5e5',alignItems:'center',}}>
          <Text style={{fontSize:14,color:'#3f3f3f',}}>环保大趋势下 卫浴企业何去何从？</Text>
          <Text style={{fontSize:12,color:'#888888',}}>2018-08-03</Text>
        </View>
        <Text style={{fontSize:12,color:'#888888'}}>   材料是生产和制造的基础，也是给使用者带来最原始、最直观感受的元素，原始材料的研发创新对卫浴这类传统行业的冲击和影响是非常大的。如今的卫浴行业，主要使用的材料如陶瓷、五金、玻璃，在制造工艺和制作思路可以朝环保方向做一定的研发，还可以跟如今最热的智能卫浴系统相融合，为企业或者品牌的环保智能大IP做前期准备。
        </Text>
        <Image source={require('../assets/images/06个人中心/ico.png')} style={{
          width:Dimensions.get('window').width-24,
          height:Math.floor((Dimensions.get('window').width-24) * 472/702),
        }}/>
        <Text style={{fontSize:12,color:'#888888'}}>我国的环保设备行业起步于20世纪60年代，目前在大气污染治理设备、水污染治理设备和固体废物处理设备三大领域已经形成了一定的规模和体系。环保税的征求必然是环保设备行业的大风口，而卫浴行业提前做好跟环保设备行业的准备，将企业向环保型企业，将会赢得先机。
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
