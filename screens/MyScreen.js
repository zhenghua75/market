import React from 'react';
import { ScrollView, StyleSheet,Button,AsyncStorage } from 'react-native';

export default class MyScreen extends React.Component {
  static navigationOptions = {
    title: '个人中心',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title="Sign out!" onPress={this._signOutAsync} />
      </ScrollView>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
