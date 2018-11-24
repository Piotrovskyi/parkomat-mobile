import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  AsyncStorage,
} from 'react-native';

import { login } from '../api';
export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);

    this.state = {
      login: 'login',
      password: 'password',
      carNumber: 'АР2121НА',
    };
  }

  async onSignup() {
    // const result = await login(this.state);
    // if (result.error) {
    //   Alert.alert('Error', result.error);
    //   return;
    // }
    // await AsyncStorage.setItem('userToken', result.authorizationToken);
    // this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image style={{ width: '80%' }} source={require('../assets/images/logo.png')} />
        <Text style={{ marginBottom: 100, fontSize: 17, color: '#9b9b9b' }}>Smart parking</Text>

        <TextInput
          value={this.state.login}
          onChangeText={login => this.setState({ login })}
          placeholder={'login'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.carNumber}
          onChangeText={carNumber => this.setState({ carNumber })}
          placeholder={'Your car number'}
          style={styles.input}
        />

        <View style={styles.loginButtonWrapper}>
          <Button title={'Sign up'} onPress={this.onSignup.bind(this)} />
        </View>

        <Text>Already have an account?</Text>
        <Button title={'Sign in'} onPress={() => this.props.navigation.navigate('Auth')} />
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
  },
});
