import React from 'react';
import { View, Button } from 'react-native';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign up',
  };

  render() {
    return (
      <View>
        <Button title="Sign up!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('App');
  };
}
