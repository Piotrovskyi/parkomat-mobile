import React from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
// import { ExpoConfigView } from '@expo/samples';
import { me, depositsList, paymentsList } from '../api';
import { sortBy } from 'lodash';
import { subscribe, setState } from '../store';

export default class WalletScreen extends React.Component {
  static navigationOptions = {
    title: 'Wallet',
  };

  state = {
    balance: 0,
    list: [],
  };

  async componentWillMount() {
    const user = await me();
    setState(user);
    const deposits = await depositsList();
    const payments = await paymentsList();
    const mergedList = sortBy(
      [
        ...deposits.map(item => ({ ...item, type: 'DEPOSIT' })),
        ...payments.map(item => ({ ...item, type: 'PAYMENT' })),
      ],
      ['createdAt'],
    );
    this.setState({ list: mergedList });
  }

  componentDidMount() {
    subscribe(({ balance }) => {
      this.setState({ balance });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <Text style={[styles.textColor, styles.headerText]}>Your balance:</Text>
          <Text style={[styles.textColor, styles.amountText]}>{this.state.balance} UAH</Text>
          <Text style={[styles.textColor, styles.infoText]}>Last refilling: 09 Avg at 10:46</Text>
          <View style={styles.addButtonWrapper}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment')}>
              <Text style={styles.addButtonText}>Add money</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listHead}>
          <Text style={styles.listHeadText}>Payments History</Text>
        </View>
        <ScrollView>
          {this.state.list.map((item, i) => {
            return <ListItem key={i} data={item} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

class ListItem extends React.Component {
  render() {
    const { amount, createdAt, type } = this.props.data;
    if (type === 'PAYMENT') {
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
              <Text style={[styles.amount, { color: 'red' }]}>-{amount} UAH</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <Text style={styles.number}># 5555555555</Text> */}
              <Text style={styles.time}>14:21-16:24</Text>
            </View>
          </View>
        </View>
      );
    }

    if (type === 'DEPOSIT') {
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
              <Text style={styles.title}>LiqPay</Text>
              <Text style={styles.amount}>+{amount} UAH</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <Text style={styles.number}># 5555555555</Text> */}
              <Text style={styles.time}>14:21-16:24</Text>
            </View>
          </View>
        </View>
      );
    }
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
  addButtonWrapper: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#3a51c0',
  },
};
