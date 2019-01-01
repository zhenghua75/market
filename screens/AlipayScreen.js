import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  WebView,
  AsyncStorage,
  Linking,
   } from 'react-native';
export default class AlipayScreen extends React.Component {
  static navigationOptions = {
    title: '支付宝',
  };

  state={
    uri:'http://jc.ynweix.com/mobile/index.php',
  };

  _getUri = async () => {
    const { navigation } = this.props;
    let order_sn = navigation.getParam('order_sn');
    const userToken = await AsyncStorage.getItem('userToken');
    let uri = 'http://jc.ynweix.com/mobile/index.php?m=AppOnlinepay&order_sn='+ order_sn +'&token=' + userToken;
    console.log(uri);
    this.setState({uri:uri});
  };

  componentWillMount() {
    this._getUri();
    
  };
  _onShouldStartLoadWithRequest=(event) => {
    let reqUrl =event.url;
    if(reqUrl.indexOf("alipay://alipayclient")>-1 || reqUrl.indexOf("alipays://alipayclient")>-1) {
        let  strUrl = reqUrl.replace("alipays", "exp");
        Linking.openURL(strUrl);
        return false; //这一行是新加入了，必须加，如果不加，就返回不了app
    }
    return true;
  }

  render() {
    
    return (
      <WebView 
        style={styles.container}
        source={{ uri: this.state.uri}} 
        originWhitelist={['*']} 
        onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
        >
      </WebView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
