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
