import React from 'react';
import { View, Text, Button, WebView } from 'react-native';
// import { ExpoConfigView } from '@expo/samples';

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Payment',
  };

  render() {
    console.log(this.props);
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <WebView
        source={{
          html: `<form method="POST" id="pa-form" action="https://www.liqpay.com/api/checkout" accept-charset="utf-8">
      <input type="hidden" name="data" value="'${123}'" />
      <input type="hidden" name="signature" value="'${123}'" />
      <input type="image" src="//static.liqpay.com/buttons/p1'EN'.radius.png" name="btn_text" />
      <script>document.addEventListener("DOMContentLoaded",function(){var b=document.getElementById("pa-form");b&&b.submit()})</script>
    </form>`,
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
