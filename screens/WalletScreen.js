import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
// import { ExpoConfigView } from '@expo/samples';

export default class WalletScreen extends React.Component {
  static navigationOptions = {
    title: 'Wallet',
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <Text style={[styles.textColor, styles.headerText]}>Your ballance:</Text>
          <Text style={[styles.textColor, styles.amountText]}>$302.55</Text>
          <Text style={[styles.textColor, styles.infoText]}>Last refilling: 09 Avg at 10:46</Text>
        </View>
        <View style={styles.listHead}>
          <Text style={styles.listHeadText}>Payments History</Text>
        </View>
        <ScrollView>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ScrollView>
      </View>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <View style={styles.listItemContainer}>
        <View>
          <Text style={styles.day}>17</Text>
          <Text style={styles.month}>jun</Text>
        </View>
        <View style={{ paddingHorizontal: 27 }}>
          <View style={{ borderColor: '#808996', borderLeftWidth: 1, flex: 1 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>ABC parking</Text>
            <Text style={styles.amount}>+80$</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.number}># 5555555555</Text>
            <Text style={styles.time}>14:21-16:24</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#3a51c0',
    padding: 27,
  },
  textColor: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
  },
  amountText: {
    fontSize: 40,
  },
  infoText: {
    fontSize: 15,
  },
  listHead: {
    paddingHorizontal: 27,
    paddingVertical: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#808996',
  },
  listHeadText: {
    fontSize: 18,
    color: '#808996',
  },

  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#808996',
    padding: 13,
    paddingHorizontal: 27,
    flexDirection: 'row',
  },
  day: {
    fontSize: 22,
    color: '#808996',
  },
  month: {
    fontSize: 15,
    color: '#808996',
  },
  title: {
    fontSize: 18,
    color: '#2e3348',
  },
  amount: {
    fontSize: 22,
    color: '#32e364',
  },
  time: {
    fontSize: 15,
    color: '#808996',
  },
  number: {
    fontSize: 15,
    color: '#808996',
  },
};
