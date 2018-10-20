import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
   } from 'react-native';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <View style={{backgroundColor:'#e5e5e5',alignItems:'center',margin:27,}}>
        <View style={{backgroundColor:'rgb(153,153,153)',width:67,height:23,}}>
          <Text style={{fontSize:12,color:'#fff',textAlign:'center',}}>{this.props.date}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',}}>
          <Image source={require('../assets/images/06个人中心/ico.png')} style={{height:49,width:49,borderRadius:5}}/>
          <View style={{backgroundColor:'#fff',padding:15,margin:12,borderRadius:5,}}>
            <Text style={{fontSize:12,color:'#c7c7c7',}}>{this.props.info}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: '消息内容',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item+index;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });

    this._info();
  };

  _info = async () => {
    this.props.navigation.navigate('Info');
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
      info={item.info}
      date={item.date}
    />
  );

  render() {
    return (
      <FlatList
        data={[{id:1,info: '有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息',title:'内建消息',date:'08:38'}, 
        {id:2,info: '有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息',title:'内建消息',date:'昨天'}, 
        {id:3,info: '有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息',title:'内建消息',date:'星期二'}, 
        {id:4,info: '有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息有消息',title:'内建消息',date:'18/08/28'}, 
        ]}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{backgroundColor:'#e5e5e5',padding:12,}}
      />
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
