import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;

    // Alert.alert('Credentials', `${username} + ${password}`);
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={{ width: '80%', marginBottom: 100 }}
          source={require('../assets/images/logo.png')}
        />

        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button title={'Login'} style={styles.loginButton} onPress={this.onLogin.bind(this)} />
      </KeyboardAvoidingView>
    );
  }

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
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
  loginButton: {
    marginTop: 100,
  },
});
