import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class MyScreen extends React.Component {
  static navigationOptions = {
    title: '个人中心',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      </ScrollView>
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
