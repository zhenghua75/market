import React from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { 
    Icon,
  } from 'expo';
const {width, height} = Dimensions.get('window');

export default class StrategyArticle extends React.Component {
  _keyExtractor = (item, index) => item.article_id;

  _renderItem = ({item, index, section}) => {
    return (
        <TouchableOpacity style={styles.listViewItem}>
            <View style={styles.listViewItemDot} />
            <Text style={styles.listViewItemText}>{item.title}</Text>
            <Text style={styles.listViewItemDate}>{item.add_time_date}</Text>
            <Icon.Ionicons
            name={'ios-arrow-forward'}
            size={22}
            style={styles.listViewItemArrow}
            />
        </TouchableOpacity>
    );
  };

  _createListHeader(itemfirst){
    if(itemfirst){
        return (
            <TouchableOpacity style={{padding:12,backgroundColor:'#fff',}}>
              <ImageBackground source={{uri:itemfirst.file_url}} style={{
                width:width-24,
                height:Math.floor((width-24) * 190/349),
                justifyContent:'flex-end',
              }}>
                <View style={{height:48,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}}>
                  <Text style={{
                    fontSize:14,
                    color:'#fff',
                    opacity:1.0,
                    paddingLeft:12
                  }}>{itemfirst.title}</Text>
                </View>
              </ImageBackground>
          </TouchableOpacity>
        )
    }else{
        return <View></View>;
    }

  }

  render() {
    var dataSource = this.props.dataSource;
    let list = [];
    let datafirst=null;
    if(dataSource && dataSource.length>0){
        datafirst=dataSource[0];
    }
    for (let i = 1; i < dataSource.length; i++) {
      list.push(dataSource[i]);
    }
    return (
        <FlatList
            data={list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={this._createListHeader(datafirst)}
        />
    );
  }
}

const styles = StyleSheet.create({
  listViewItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:12,
    borderBottomWidth:1,
    borderColor:'rgb(229,229,229)',
    backgroundColor:'#fff',
    height:60,
  },
  listViewItemDot:{
    height:5,
    width:5,
    borderRadius:5,
    backgroundColor:'#000000',
  },
  listViewItemText:{
    fontSize:14,
    color:'#888888',
    flex:1,
    marginLeft:14,
  },
  listViewItemDate:{
    fontSize:12,
    color:'#c7c7c7',
    marginRight:14,
  },
  listViewItemArrow:{

  },
});
