import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class CustomButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: '#3a51c0',
            borderRadius: 100,
            paddingVertical: 11,
            paddingHorizontal: 36,
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
          },
          this.props.style,
        ]}
        onPress={this.props.onPress}>
        <Text style={{ fontSize: 22, color: 'white' }}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
