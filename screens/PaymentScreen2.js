import React from 'react';
import { View, Text, Button, WebView, KeyboardAvoidingView, StyleSheet } from 'react-native';

export default class PaymentScreen2 extends React.Component {
  static navigationOptions = {
    title: 'Confirmation',
  };

  iframeState = 0;

  handleOnLoad = () => {
    // hack here
    console.log(this.iframeState);
    if (this.iframeState === 1) {
      this.props.navigation.navigate('Wallet');
    } else {
      this.iframeState += 1;
    }
  };

  render() {
    if (!this.props.navigation.state.params) return;
    return (
      <WebView
        onLoad={this.handleOnLoad}
        source={{ uri: this.props.navigation.state.params.payUrl }}
        style={{ flex: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#3a51c0',
    marginBottom: 10,
  },
  loginButtonWrapper: {
    marginBottom: 80,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#3a51c0',
    paddingVertical: 5,
    paddingHorizontal: 40,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 20,
  },
});
