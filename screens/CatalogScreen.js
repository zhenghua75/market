import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
   } from 'react-native';

export default class CatalogScreen extends React.Component {
  static navigationOptions = {
    title: '分类',
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
  };

  _renderItem = ({item, index, section}) => {
    //const textColor = this.state.selected[item.id] ? '#ff8f00' : '#3f3f3f';
    return (
    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}>
      <View style={{width:5,height:39,backgroundColor:'#ff8f00'}}/>
      <Text style={{fontSize:14,color:'#ff8f00'}}>{item.name}</Text>
    </TouchableOpacity>
  )};

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={{width:94,backgroundColor:'#f5f5f5'}}>
          <FlatList
            data={[
              {id:'1',name:'五金工具'}, 
              {id:'2',name:'建筑耗材'}, 
            ]}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent:'flex-start',flexWrap:'wrap'}}>
          <View style={styles.box}>
            <Image source={require('../assets/images/03分类/1.png')} style={styles.img}/>
            <Text style={styles.txt}>电气胶带</Text>
          </View>
          <View style={styles.box}>
            <Image source={require('../assets/images/03分类/2.png')} style={styles.img}/>
            <Text style={styles.txt}>塑料软管</Text>
          </View>
          <View style={styles.box}>
            <Image source={require('../assets/images/03分类/3.png')} style={styles.img}/>
            <Text style={styles.txt}>装饰开关</Text>
          </View>
          <View style={styles.box}>
            <Image source={require('../assets/images/03分类/4.png')} style={styles.img}/>
            <Text style={styles.txt}>尺子</Text>
          </View>
          <View style={styles.box}>
            <Image source={require('../assets/images/03分类/5.png')} style={styles.img}/>
            <Text style={styles.txt}>钻头</Text>
          </View>
          <View style={styles.box}>
            <Image source={require('../assets/images/03分类/6.png')} style={styles.img}/>
            <Text style={styles.txt}>磨具</Text>
          </View>
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
  contentContainer: {
    flexDirection:'row',
  },
  box:{
    alignItems:'center',
    justifyContent:'center',
    height:80,
    width:80,
  },
  img:{
    width:49,
    height:36,
  },
  txt:{
    fontSize:12,
    color:'#88888888',
  },
});
