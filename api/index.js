import { Permissions, Notifications } from 'expo';
const apiHost = 'http://185.12.178.11:3000';
let token = null;

export const setToken = newToken => {
  token = newToken;
  console.log(token);
};

const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token,
});

export const getParkings = () => {
  return fetch(apiHost + '/api/parkings', { headers: headers() })
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

const PUSH_ENDPOINT = apiHost + '/api/user/notificationsToken';

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
      ...headers(),
    },
    body: JSON.stringify({
      token,
    }),
  }).catch(err => console.error(err.message));
};

export const login = payload => {
  console.log('login', payload);
  return fetch(apiHost + '/api/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('API', error.message);
    });
};

export const signup = payload => {
  console.log('signup', payload);
  return fetch(apiHost + '/api/user/registration', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('API', error.message);
    });
};

export const deposit = payload => {
  console.log('deposit', payload);
  return fetch(apiHost + '/api/user/deposits', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers(),
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('API', error.message);
    });
};

export const me = () => {
  return fetch(apiHost + '/api/user', {
    method: 'GET',
    headers: {
      ...headers(),
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('API', error.message);
    });
};

export const depositsList = () => {
  return fetch(apiHost + '/api/user/deposits', {
    method: 'GET',
    headers: {
      ...headers(),
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('API', error.message);
    });
};

export const paymentsList = () => {
  return fetch(apiHost + '/api/user/payments', {
    method: 'GET',
    headers: {
      ...headers(),
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('API', error.message);
    });
};
