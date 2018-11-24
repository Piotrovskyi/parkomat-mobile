import React from 'react';
import { Text, View } from 'react-native';

export default class CustomButton extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}
