import { Permissions, Notifications } from 'expo';
const apiHost = 'http://10.1.1.213:3000';

export const getParkings = () => {
  return fetch(apiHost + '/api/parkings')
    .then(response => response.json())
    .then(items =>
      items.map(({ latitude, longitude, ...rest }) => ({
        ...rest,
        latlng: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      })),
    )
    .catch(error => {
      console.error('API', error.message);
    });
};

// {
//   latlng: { latitude: 37.800572, longitude: -122.4247977 },
//   title: 'Test name 2',
//   description: 'test desc 1',
// },

const PUSH_ENDPOINT = apiHost + '/api/settings/notificationsToken';

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  console.log(existingStatus);
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    console.log('NO PERMISSIONS');
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      userId: 2,
    }),
  }).catch(err => console.err(err));
};
