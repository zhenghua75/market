import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  AsyncStorage,
  FlatList
} from 'react-native';

export default class AllSciencesDetailScreen extends React.Component {
  static navigationOptions = {
    title: '百科',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state = {
    artinfo:{
        'title':'',
        'add_time_date':'',
        'content_list':[]
    },
  }

  componentWillMount() {
    const { navigation } = this.props;
    let art_id = navigation.getParam('id');
    this._getStrategyInfo(art_id);
  }

  _getStrategyInfo=async (id) =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetArticleInfo',
      'token':userToken,
      'id':id,
    };
    let responseJson = await ApiPost(data);
    let artinfo = responseJson.Data;
    this.setState({
        artinfo:artinfo
    });
  };

  _keyExtractor = (item, index) => 'item'+index;

  _createListItem = ({item}) => {
    if(item.type=='img'){
        return(
          <View style={{paddingVertical:12}}>
            <Image source={{uri:item.content}} style={{
                width:Dimensions.get('window').width-24,
                height:Math.floor((Dimensions.get('window').width-24) * 472/702),
            }}/>
          </View>
        );
    }else{
        return (
          <View style={{paddingVertical:12}}>
            <Text style={{fontSize:14,color:'#616161',lineHeight:20}}>{item.content}</Text>
          </View>
        );
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{padding:12,}}>
        <View style={{padding:12,borderBottomWidth:1,borderColor:'#e5e5e5',alignItems:'center',}}>
          <Text style={{fontSize:16,color:'#3f3f3f',}}>{this.state.artinfo.title}</Text>
          <Text style={{fontSize:12,color:'#888888',lineHeight:20}}>{this.state.artinfo.add_time_date}</Text>
        </View>
        <FlatList
            data={this.state.artinfo.content_list}
            keyExtractor={this._keyExtractor}
            renderItem={this._createListItem}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:20,
  },
});
