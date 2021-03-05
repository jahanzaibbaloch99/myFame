import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const spinnerStyles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Spinner extends Component {
  render() {
    return (
      <View style={spinnerStyles.spinnerStyle}>
        <ActivityIndicator color="black" />
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4286f4',
  },
});
