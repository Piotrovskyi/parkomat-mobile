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

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Payment',
  };

  state = {
    amount: '0',
  };

  onPay = async () => {
    // if (!this.state.amount) return;
    const { link } = await deposit({ amount: this.state.amount });
    this.props.navigation.navigate('Confirm', { payUrl: link });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          value={this.state.amount}
          onChangeText={amount => this.setState({ amount })}
          placeholder={'Amount in UAH'}
          style={styles.input}
        />

        <View style={styles.loginButtonWrapper}>
          <Button title={'Pay'} onPress={this.onPay.bind(this)} />
        </View>
      </KeyboardAvoidingView>
    );
    // return (
    //   <WebView
    //     source={{
    //       html: `<form method="POST" id="pa-form" action="https://www.liqpay.com/api/checkout" accept-charset="utf-8">
    //   <input type="hidden" name="data" value="'${123}'" />
    //   <input type="hidden" name="signature" value="'${123}'" />
    //   <input type="image" src="//static.liqpay.com/buttons/p1'EN'.radius.png" name="btn_text" />
    //   <script>document.addEventListener("DOMContentLoaded",function(){var b=document.getElementById("pa-form");b&&b.submit()})</script>
    // </form>`,
    //     }}
    //     style={{ flex: 1 }}
    //   />
    // );
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
