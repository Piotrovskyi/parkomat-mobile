import React from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { ExpoConfigView } from '@expo/samples';
import { me, depositsList, paymentsList } from '../api';
import { sortBy } from 'lodash';
import { subscribe, setState, getState } from '../store';
import moment from 'moment';

export default class WalletScreen extends React.Component {
  static navigationOptions = {
    title: 'Wallet',
  };

  state = {
    balance: 0,
    list: [],
  };

  async getList() {
    const deposits = await depositsList();
    const payments = await paymentsList();
    const mergedList = sortBy(
      [
        ...deposits.map(item => ({ ...item, type: 'DEPOSIT' })),
        ...payments.map(item => ({ ...item, type: 'PAYMENT' })),
      ],
      'createdAt',
    ).reverse();
    console.log(mergedList);
    this.setState({ list: mergedList });
  }

  async componentWillMount() {
    const user = await me();
    setState(user);
    await this.getList();
    this.setState(getState());
  }

  componentDidMount() {
    subscribe(user => {
      this.setState(user);
      this.getList();
    });
  }

  render() {
    const { lastDeposit } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <Text style={[styles.textColor, styles.headerText]}>Your balance:</Text>
          <Text style={[styles.textColor, styles.amountText]}>{this.state.balance} UAH</Text>
          {lastDeposit && (
            <Text style={[styles.textColor, styles.infoText]}>
              Last refilling: {moment.unix(lastDeposit.createdAt).format('DD MMM')} at{' '}
              {moment.unix(lastDeposit.createdAt).format('HH:MM')}
            </Text>
          )}
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
          {this.state.list.length ? (
            this.state.list.map((item, i) => {
              return <ListItem key={i} data={item} />;
            })
          ) : (
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator />
            </View>
          )}
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
            <Text style={styles.day}>{moment.unix(createdAt).format('DD')}</Text>
            <Text style={styles.month}>{moment.unix(createdAt).format('MMM')}</Text>
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
              <Text style={styles.number}>
                {moment.unix(createdAt).format('DD MMM')} at{' '}
                {moment.unix(createdAt).format('HH:MM')}
              </Text>
              {/* <Text style={styles.time}>14:21-16:24</Text> */}
            </View>
          </View>
        </View>
      );
    }

    if (type === 'DEPOSIT') {
      return (
        <View style={styles.listItemContainer}>
          <View>
            <Text style={styles.day}>{moment.unix(createdAt).format('DD')}</Text>
            <Text style={styles.month}>{moment.unix(createdAt).format('MMM')}</Text>
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
              <Text style={styles.number}>
                {moment.unix(createdAt).format('DD MMM')} at{' '}
                {moment.unix(createdAt).format('HH:MM')}
              </Text>
              {/* <Text style={styles.time}>14:21-16:24</Text> */}
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
