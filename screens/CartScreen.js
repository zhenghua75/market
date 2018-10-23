import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  SectionList,
  Image,
  Slider,
  ImageBackground,
   } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export default class CartScreen extends React.Component {
  // static navigationOptions = {
  //   title: '购物车',
  // };
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '购物车'),
    };
  };

  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem1 = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  _renderItem = ({item, index, section}) => (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={require('../assets/images/10购物车/购物车未选中.png')} />
      <Image source={require('../assets/images/s1.png')} style={{width:90,height:90}}/>
      <View style={{}}>
        <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.name}</Text>
        <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.attr}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>{item.price}</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'rgba(0,0,0,0.22)',borderRadius:10,}}>
            <TouchableOpacity style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../assets/images/10购物车/加号.png')} />
            </TouchableOpacity>
            <View style={{width:1,height:44,backgroundColor:'rgba(0, 0, 0, 0.22)',}}/>
            <Text style={{width:44,textAlign:'center'}}>{item.num}</Text>
            <View style={{width:1,height:44,backgroundColor:'rgba(0, 0, 0, 0.22)',}}/>
            <TouchableOpacity style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../assets/images/10购物车/减号.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  _renderHeader = ({section: {title}}) => (
    <View style={{flexDirection:'row'}}>
      <Image source={require('../assets/images/10购物车/购物车未选中.png')} />
      <Image source={require('../assets/images/04订单/店铺.png')} />
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <Image source={require('../assets/images/04订单/右箭头.png')} />
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          sections={[
            {title: '魔都CV大大1', data: [{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3}]},
            {title: '魔都CV大大2', data: [{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3},{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3}]},
            {title: '魔都CV大大3', data: [{name:'远东电线电缆   BV2.5平方国标家装照明插座用铜芯电线单',attr:'100米硬线 蓝色 100米/卷',price:38,num:3}]},
          ]}
          keyExtractor={(item, index) => item + index}
        />
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/images/10购物车/购物车未选中.png')} />
            <Text>全选</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>合计：</Text>
            <Text>¥38</Text>
            <TouchableOpacity onPress={this._nextAsync} style={{alignItems:'center',justifyContent:'center',}}>
              <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={{width: 60, height: 20,alignItems:'center',justifyContent:'center',}}>
                <Text>结算(1)</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: '购物车(0)'})}
        />
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
