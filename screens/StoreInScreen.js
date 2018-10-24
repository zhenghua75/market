import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
   } from 'react-native';

import { Icon } from 'expo';

export default class StoreInScreen extends React.Component {
  static navigationOptions = {
    title: '商家入驻',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../assets/images/07商品上传/图层93.png')} style={{
          width:Dimensions.get('window').width,
          height:Math.floor(Dimensions.get('window').width * 306/750),
        }}/>
        <View>
          <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
            height:36,marginTop:12,alignItems:'center',paddingHorizontal:12,}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>商户名称：</Text>
            <Icon.Ionicons
              name={'md-star'}
              size={8}
              style={{}}
              color={'red'}
            />
            <TextInput style={{flex:1,}} placeholder={'商户名称'} underlineColorAndroid={'white'}/>
          </View>
          <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
            height:36,marginTop:12,alignItems:'center',paddingHorizontal:12,}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>主要项目：</Text>
            <Icon.Ionicons
              name={'md-star'}
              size={8}
              style={{}}
              color={'red'}
            />
            <TextInput style={{flex:1,}} placeholder={'主要项目'} underlineColorAndroid={'white'}/>
          </View>
          <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
            height:64,marginTop:12,alignItems:'center',paddingHorizontal:12,}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>简单介绍：</Text>
            <Icon.Ionicons
              name={'md-star'}
              size={8}
              style={{}}
              color={'red'}
            />
            <TextInput style={{flex:1,}} placeholder={'简单介绍下自己'} multiline={true} underlineColorAndroid={'white'}/>
          </View>
          <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
            height:36,marginTop:12,alignItems:'center',paddingHorizontal:12,}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>联系人：</Text>
            <Icon.Ionicons
              name={'md-star'}
              size={8}
              style={{}}
              color={'red'}
            />
            <TextInput style={{flex:1,}} placeholder={'您的称呼'} underlineColorAndroid={'white'}/>
          </View>
          <View style={{paddingHorizontal:12,}}>
            <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
              height:36,marginTop:12,alignItems:'center',}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>手机号：</Text>
              <Icon.Ionicons
                name={'md-star'}
                size={8}
                style={{}}
                color={'red'}
              />
              <TextInput style={{flex:1,}} placeholder={'您的手机号'} underlineColorAndroid={'white'}/>
              
            </View>
            <Text style={{fontSize:14,color:'#c7c7c7',}}>请仔细填写联系方式，保证我们能尽快联系您。</Text>
          </View>
          <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
            height:36,marginTop:12,alignItems:'center',paddingHorizontal:12,}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>账号：</Text>
            <Icon.Ionicons
              name={'md-star'}
              size={8}
              style={{}}
              color={'red'}
            />
            <TextInput style={{flex:1,}} placeholder={'账号'} underlineColorAndroid={'white'}/>
          </View>
          <View style={{paddingHorizontal:12,}}>
            <View style={{borderTopWidth:1,borderColor:'#e5e5e5',flexDirection:'row',
              height:36,marginTop:12,alignItems:'center',}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>密码：</Text>
              <Icon.Ionicons
                name={'md-star'}
                size={8}
                style={{}}
                color={'red'}
              />
              <TextInput style={{flex:1,}} placeholder={'密码'} underlineColorAndroid={'white'}/>
            </View>
            <Text style={{fontSize:14,color:'#c7c7c7',}}>用于登录多商户后台，请认真填写。</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:12,marginTop:32,}}>
            <Image source={require('../assets/images/07商品上传/同意.png')} />
            <Text>我已经阅读并了解</Text>
            <TouchableOpacity>
              <Text style={{fontSize:16,color:'#ff8f00'}}>入驻申请协议</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignItems:'center',marginTop:78,}}>
            <View style={{height:34,width:274,backgroundColor:'#ff8f00',borderRadius:5,}}>
              <Text style={{fontSize:18,color:'#fff'}}>申请入驻</Text>
            </View>
          </TouchableOpacity>
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
});
