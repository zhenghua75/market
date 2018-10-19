import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
   } from 'react-native';

export default class ConstructionTeamScreen extends React.Component {
  static navigationOptions = {
    title: '施工队',
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
              <Text>输入施工团队</Text>
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
        <View style={{marginHorizontal:12,marginVertical:20,backgroundColor:'#fff'}}>
          <TouchableOpacity onPress={this._detail}>
            <ImageBackground source={require('../assets/images/12施工队展示/bg.png')} style={{
              width:Dimensions.get('window').width-24,
              height:Math.floor((Dimensions.get('window').width-24) * 240/702),
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Image source={require('../assets/images/12施工队展示/头像.png')} style={{width:70,height:70,}}/>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={{textAlign:'center',fontSize:18,color:'#3f3f3f',margin:10,}}>雄心壮志团队</Text>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:14,color:'#888888',}}>信誉评分：</Text>
            <Text style={{fontSize:14,color:'#ff8f00',}}>7.0分</Text>
          </View>
          <View style={{marginHorizontal:10,marginVertical:20,}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>服务分类：</Text>
              <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:20,}}>选什么就是什么分类</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,marginVertical:20,}}>人员规模：</Text>
              <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:20,marginVertical:20,}}>30人</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>所在地区：</Text>
              <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:20,}}>重庆</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,marginVertical:20,}}>联系人：</Text>
              <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:20,marginVertical:20,}}>张三</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#3f3f3f',textAlign:'right',width:80,}}>手机号：</Text>
              <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:20,}}>12345678901</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  _detail = async () => {
    this.props.navigation.navigate('ConstructionTeamDetail');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234,238,237)',
  },
});
