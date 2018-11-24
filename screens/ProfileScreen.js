import React from 'react';
import { View, Text, Button } from 'react-native';
// import { ExpoConfigView } from '@expo/samples';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  handleAddMoney() {
    this.props.navigation.navigate('Payment');
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>profile here</Text>
        <Button onPress={() => this.handleAddMoney()} title="add money" color="blue" />
      </View>
    );
  }
}
