import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Button,
   } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class CartScreen extends React.Component {
  // static navigationOptions = {
  //   title: '购物车',
  // };
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '购物车'),
    };
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: '购物车(0)'})}
        />
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
