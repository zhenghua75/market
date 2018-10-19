import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  ImageBackground,
   } from 'react-native';
import Swiper from 'react-native-swiper';

export default class ConstructionTeamDetailScreen extends React.Component {
  static navigationOptions = {
    title: '施工团队',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Swiper style={styles.wrapper} dotColor={'#999999'} activeDotColor={'#ff8f00'} 
          width={Dimensions.get('window').width}
          height={Math.floor(Dimensions.get('window').width * 445/750)}>
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <Image source={require('../assets/images/08施工团队/施工团队照.png')} style={{
              width: Dimensions.get('window').width,
              height: Math.floor(Dimensions.get('window').width * 445/750),
            }}/>
          </View>
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <Image source={require('../assets/images/08施工团队/施工团队照.png')} style={{
              width: Dimensions.get('window').width,
              height: Math.floor(Dimensions.get('window').width * 445/750),
            }}/>
          </View>
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <Image source={require('../assets/images/08施工团队/施工团队照.png')} style={{
              width: Dimensions.get('window').width,
              height: Math.floor(Dimensions.get('window').width * 445/750),
            }}/>
          </View>
        </Swiper>
        <View style={{backgroundColor:'#fff',padding:12,paddingBottom:60,marginBottom:12,}}>
          <View style={{borderBottomWidth:1,borderColor:'rgb(229,229,229)',}}>
            <Text style={{fontSize:18,color:'#3f3f3f',}}>博大装饰公司公司公司公司公司公司</Text>
            <View style={{flexDirection:'row',}}>
              <Text style={{fontSize:12,color:'#888888'}}>规模：10人</Text>
              <Text style={{fontSize:12,color:'#888888',marginLeft:35,}}>信誉评分：</Text>
              <Text style={{fontSize:12,color:'#ff8f00'}}>7.0</Text>
            </View>
            <Text style={{fontSize:19,color:'#ff8f00',marginVertical:11,}}>¥158.00</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',margin:20,}}>
            <View style={{width:83,height:22,backgroundColor:'#ff8f00',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontSize:14,color:'#fff'}}>团队介绍</Text>
            </View>
          </View>
          <Text style={{fontSize:12,color:'#888888'}}>博大装饰公司从创建初期到现在，一直遵循决不外包的经营理念，经过近20年的历练，博大公司已经锻造出一支强大、极具战斗力的施工队伍，这支队伍技术过硬、吃苦耐劳、乐于奉献、勇于亮剑，是全国装饰系统遐迩闻名的优秀施工团队，在业界享有“铁军”美誉。</Text>
          <View style={{alignItems:'center',justifyContent:'center',margin:20,}}>
            <View style={{width:83,height:22,backgroundColor:'#ff8f00',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontSize:14,color:'#fff'}}>成员介绍</Text>
            </View>
          </View>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:50,}}>
            <View style={{position: 'absolute', top: 0, 
              left: Dimensions.get('window').width/4-40,width:59,height:59,elevation: 100,zIndex: 100,}}>
              <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:59,height:59,}}/>
            </View>
            <View style={{position: 'absolute', top: 0, 
              left: Dimensions.get('window').width*0.75-40,width:59,height:59,elevation: 100,zIndex: 100,}}>
              <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:59,height:59,}}/>
            </View>
            <View style={{borderWidth:1,borderColor:'rgb(229,229,229)',
                width: Dimensions.get('window').width/2-20,alignItems:'center',paddingTop:30,
              }}>
              
              <Text style={{fontSize:15,color:'#3f3f3f',}}>吴太贵</Text>
              <Text style={{fontSize:12,color:'#888888',}}>我是瓦匠瓦匠瓦匠</Text>
              <Text style={{fontSize:12,color:'#888888',}}>这个地方介绍吴太贵的经历？哎呀，这个地方介绍吴太贵的经历？哎呀，这个地方介绍吴太贵的经历？哎呀，这个地方介绍吴太贵的经历？哎呀，</Text>
            </View>

            <View style={{borderWidth:1,borderColor:'rgb(229,229,229)',
                width: Dimensions.get('window').width/2-20,alignItems:'center',paddingTop:30,
              }}>
              <Text style={{fontSize:15,color:'#3f3f3f',}}>吴太贵</Text>
              <Text style={{fontSize:12,color:'#888888',}}>我是瓦匠瓦匠瓦匠</Text>
              <Text style={{fontSize:12,color:'#888888',}}>这个地方介绍吴太贵的经历？哎呀，这个地方介绍吴太贵的经历？哎呀，这个地方介绍吴太贵的经历？哎呀，这个地方介绍吴太贵的经历？哎呀，</Text>
            </View>
          </View>
        </View>
        <View style={{padding:12,backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'rgb(229,229,229)',alignItems:'center',padding:12,}}>
            <View style={{width:5,height:25,backgroundColor:'rgb(255,142,1)',}}/>
            <Text style={{fontSize:18,color:'#ff8f00',marginLeft:12,}}>评论</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',padding:16,borderBottomWidth:1,borderColor:'rgb(229,229,229)',}}>
            <View style={{width:67,height:24,backgroundColor:'#ff8f00',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#fff'}}>全部(0)</Text>
            </View>
            <View style={{width:67,height:24,backgroundColor:'#fbc075',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#3f3f3f'}}>好评(0)</Text>
            </View>
            <View style={{width:67,height:24,backgroundColor:'#fbc075',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#3f3f3f'}}>中评(0)</Text>
            </View>
            <View style={{width:67,height:24,backgroundColor:'#fbc075',alignItems:'center',justifyContent:'center',borderRadius:12,}}>
              <Text style={{fontSize:14,color:'#3f3f3f'}}>差评(0)</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:'#fff',marginBottom:12,}}>
          <View style={{flexDirection:'row',padding:12,}}>
            <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={{width:30,height:30,}}/>
            <Text style={{fontSize:16,color:'#3f3f3f',marginLeft:12,}}>冬冬撒吗</Text>
          </View>
          <Text style={{fontSize:12,color:'#c7c7c7',}}>2018-10-19 品牌：都是有货 型号</Text>
          <Text style={{fontSize:16,color:'#3f3f3f',marginVertical:17,}}>东西很好</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>浏览2次</Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>评论</Text>
              </View>
              <View style={{flexDirection:'row',borderWidth:1,borderColor:'rgb(229,229,229)',padding:12,borderRadius:12,margin:12,}}>
                <Image source={require('../assets/images/08施工团队/待评价.png')}/>
                <Text>点赞</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#fff',}}>
          <View style={{alignItems:'center',flex:0.1,}}>
            <Image source={require('../assets/images/08施工团队/待评价.png')}/>
            <Text>收藏</Text>
          </View>
          <View style={{alignItems:'center',flex:0.1}}>
            <Image source={require('../assets/images/08施工团队/待评价.png')}/>
            <Text>购物车</Text>
          </View>
          <View style={{alignItems:'center',flex:0.1}}>
            <Image source={require('../assets/images/08施工团队/待评价.png')}/>
            <Text>客服</Text>
          </View>
          <View style={{backgroundColor:'rgb(229,136,15)',alignItems:'center',justifyContent:'center',flex:0.35,}}>
            <Text style={{color:'#fff'}}>加入购物车</Text>
          </View>
          <View style={{backgroundColor:'rgb(255,142,1)',alignItems:'center',justifyContent:'center',flex:0.35,}}>
            <Text style={{color:'#fff'}}>立即下单</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(229,229,229)',
  },
});
