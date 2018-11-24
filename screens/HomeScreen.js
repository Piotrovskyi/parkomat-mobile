import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Button,
  Linking,
} from 'react-native';
import { WebBrowser, MapView, Permissions, Location, MapMarker, Notifications } from 'expo';
import { get } from 'lodash';
import { getParkings, registerForPushNotificationsAsync } from '../api';

import ParkingInfo from '../components/ParkingInfo';
import { MonoText } from '../components/StyledText';
// import FadeInView from '../components/AnimatedComponent';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    location: null,
    errorMessage: null,
    parkings: [],
    selectedParking: null,
    notification: {},
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    console.log(notification.data);
    this.setState({ notification: notification });
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      this._getParkingsAsync();
    }
  }

  _getParkingsAsync = async () => {
    const parkings = await getParkings();
    this.setState({ parkings });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  selectParking(selectedParking) {
    this.setState({ selectedParking });
  }

  makeRoute = selectedParking => {
    Linking.openURL(
      `http://maps.apple.com/maps?daddr=
        ${selectedParking.latlng.latitude},${selectedParking.latlng.longitude}&saddr=${
        this.state.location.coords.latitude
      },${this.state.location.coords.longitude}`,
    );
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location.coords);
    }

    if (!this.state.location) {
      return (
        <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator style={{ marginBottom: 10 }} />
          <Text>We love you!</Text>
          <Text>Your friends from parkomat</Text>
        </View>
      );
    }

    const { selectedParking } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          // provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: get(this, 'state.location.coords.latitude'),
            longitude: get(this, 'state.location.coords.longitude'),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: get(this, 'state.location.coords.latitude'),
              longitude: get(this, 'state.location.coords.longitude'),
            }}
            image={require('../assets/images/me.png')}
          />
          {this.state.parkings.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.latlng}
              onPress={() => this.selectParking(marker)}
              onDeselect={() => this.setState({ selectedParking: null })}
              // title={marker.title}
              // description={marker.description}
              image={require('../assets/images/pin.png')}
            />
          ))}
        </MapView>

        {/* {selectedParking && (
          <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>{selectedParking.title}</Text>
            <Text style={styles.tabBarInfoText}>{selectedParking.description}</Text>

            <Button onPress={() => this.makeRoute(selectedParking)} title="GO" color="#3a51c0" />
          </View>
        )} */}
        {selectedParking && (
          <ParkingInfo selectedParking={selectedParking} makeRoute={this.makeRoute} />
        )}
      </View>
    );
  }

  // _maybeRenderDevelopmentModeWarning() {
  //   if (__DEV__) {
  //     const learnMoreButton = (
  //       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
  //         Learn more
  //       </Text>
  //     );

  //     return (
  //       <Text style={styles.developmentModeText}>
  //         Development mode is enabled, your app will be slower but you can use useful development
  //         tools. {learnMoreButton}
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         You are not in development mode, your app will run at full speed.
  //       </Text>
  //     );
  //   }
  // }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
});
