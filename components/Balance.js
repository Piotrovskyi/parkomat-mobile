import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class Balance extends React.Component {
  render() {
    return (
      <View style={styles.tabBarInfoContainer}>
        <Text style={{ color: '#808996', fontSize: 18 }}>
          Your balance: {this.props.amount} UAH
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarInfoContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    marginHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    // height: 120,
  },
});
