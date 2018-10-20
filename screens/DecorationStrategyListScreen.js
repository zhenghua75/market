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
        <View style={{flexDirection:'row',backgroundColor:'#fff',
          borderBottomWidth:1,borderColor:'#e5e5e5',justifyContent:'space-between',
          paddingHorizontal:12,
          paddingVertical:15,
          }}>
          <Text style={{ color: '#3f3f3f',fontSize:14 }}>{this.props.info}</Text>
          <Text style={{fontSize:14,color:'#888888'}}>{this.props.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class DecorationStrategyListScreen extends React.Component {
  static navigationOptions = {
    title: '攻略',
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

    this._detail();
  };

  _detail = async () => {
    this.props.navigation.navigate('DecorationStrategyDetail');
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
        data={[
          {id:1,info: '这是2018年10月20日的一篇文章',date:'08:38'}, 
          {id:2,info: '这是2018年10月20日的一篇文章',date:'08:38'}, 
          {id:3,info: '这是2018年10月20日的一篇文章',date:'08:38'}, 
          {id:4,info: '这是2018年10月20日的一篇文章',date:'08:38'}, 
          {id:5,info: '这是2018年10月20日的一篇文章',date:'08:38'}, 
          {id:6,info: '这是2018年10月20日的一篇文章',date:'08:38'}, 
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
