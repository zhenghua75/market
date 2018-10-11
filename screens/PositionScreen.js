import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Button,
   } from 'react-native';
import { MapView } from 'expo';

export default class PositionScreen extends React.Component {
  static navigationOptions = {
    title: '定位',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title='新增收货地址' onPress={this._addAddress}/>
      </ScrollView>
    );
  }

  _addAddress = async () => {
    this.props.navigation.navigate('AddAddress');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
