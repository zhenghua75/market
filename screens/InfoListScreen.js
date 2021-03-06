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
      <TouchableOpacity onPress={this._onPress}>
        <View style={{flexDirection:'row',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'rgb(229,229,229)',}}>
          <Image source={require('../assets/images/06个人中心/ico.png')} style={{height:49,width:49,padding:12,}}/>
          <View style={{padding:12,flex:1,}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{ color: '#3f3f3f',fontSize:18 }}>{this.props.title}</Text>
              <Text style={{fontSize:12,color:'#c7c7c7'}}>{this.props.date}</Text>
            </View>
            <Text style={{fontSize:12,color:'#c7c7c7'}}>{this.props.info}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class InfoListScreen extends React.Component {
  static navigationOptions = {
    title: '消息列表',
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
        style={{backgroundColor:'#fff',padding:12,}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
