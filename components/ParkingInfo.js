import React from 'react';
import { Text, View, StyleSheet, Platform, Button, Image, TouchableOpacity } from 'react-native';

export default class ParkingInfo extends React.Component {
  render() {
    const { selectedParking, makeRoute } = this.props;
    console.log(selectedParking);
    return (
      <View style={styles.tabBarInfoContainer}>
        <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={styles.headerText}>{selectedParking.title}</Text>
          <Text style={styles.headerText}>{selectedParking.price} UAH/hour</Text>
        </View>
        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: 15 }}>
          <View style={[styles.center, { flex: 1 }]}>
            <Text style={styles.tabBarInfoText}>{selectedParking.description}</Text>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ marginRight: 15, justifyContent: 'flex-end' }}>
                <Text style={styles.detailsText}>Free parking places</Text>
                <Text style={styles.detailsText}>Opening hours</Text>
              </View>
              <View>
                <Text style={styles.detailsText}>
                  <Text style={styles.freeSpots}>
                    {selectedParking.places - selectedParking.actualCars.length}
                  </Text>
                  /{selectedParking.places}
                </Text>
                <Text style={styles.detailsText}>06:00-00:00</Text>
              </View>
            </View>
          </View>

          <View style={[styles.center, { padding: 5 }]}>
            <View style={{ borderColor: 'gray', borderLeftWidth: 1, flex: 1 }} />
          </View>

          <View style={[styles.center, { paddingHorizontal: 10 }]}>
            <TouchableOpacity onPress={() => makeRoute(selectedParking)}>
              <Image
                source={require('../assets/images/GO.png')}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center' }}>Distance:</Text>
            <Text style={[styles.detailsText, { textAlign: 'center' }]}> 5.3km</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#3a51c0',
    width: '100%',
    padding: 10,
  },
  headerText: {
    fontSize: 22,
    color: 'white',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
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
  detailsText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
    marginBottom: 5,
  },
  tabBarInfoText: {
    width: '100%',
    fontSize: 17,
    // color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
    marginBottom: 8,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  freeSpots: {
    fontSize: 25,
    color: '#ffa613',
    textAlign: 'left',
  },
});
