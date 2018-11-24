import React from 'react';
import {
  View,
  Text,
  Button,
  WebView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';
// import { ExpoConfigView } from '@expo/samples';
import { deposit } from '../api';
import CustomButton from '../components/CustomButton';

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Payment',
  };

  state = {
    amountText: 'UAH ',
    amount: '0',
  };

  onPay = async () => {
    const { link } = await deposit({ amount: this.state.amount });
    this.props.navigation.navigate('Confirm', { payUrl: link });
  };

  changeAmount = value => {
    if (value.length < 4) return;

    this.setState({
      amountText: value,
      amount: value.replace('UAH ', ''),
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          value={this.state.amountText}
          onChangeText={this.changeAmount}
          placeholder={'Amount in UAH'}
          style={styles.input}
          autoFocus
        />

        <CustomButton style={{ marginTop: 40 }} onPress={this.onPay.bind(this)}>
          Pay
        </CustomButton>
      </KeyboardAvoidingView>
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
    width: '50%',
    borderBottomWidth: 1,
    borderColor: '#3a51c0',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 40,
    height: 60,
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
