import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Image, 
  Text, 
  View, 
  TouchableOpacity,
  Dimensions,
    } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '发现',
     headerTitleStyle:{
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
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
        <View style={{marginHorizontal:12,marginVertical:24,backgroundColor:'#fff',
      paddingHorizontal:12,paddingVertical:14,}}>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Image source={require('../assets/images/06个人中心/头像.png')} style={{width:43,height:43,margin:10}}/>
            <Text style={{fontSize:14,color:'#3f3f3f',}}>不晓得什么山谷</Text>
          </View>
          <TouchableOpacity onPress={this._detail}>
            <Text style={{fontSize:12,color:'#3f3f3f',padding:12,}}>“如果你花费7.2亿欧元收购一家负债2.2亿欧元的俱乐部，而且你还以11%的利息借贷，这意味着你没钱。”意大利《晚邮报》直言不讳地diss米兰新老板李勇鸿。</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center',}}>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
            <Image source={require('../assets/images/11发现/图.png')} style={{width:Dimensions.get('window').width/3-30,
                    height:Dimensions.get('window').width/3-30,margin:5,}}/>
          </View>
        </View>
      </ScrollView>
    );
  }

  _detail = async () => {
      this.props.navigation.navigate('FindDetail');
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(229,229,229)',
  },
  searchBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
  },
  searchBoxText:{
    flex:1,
  },
});
