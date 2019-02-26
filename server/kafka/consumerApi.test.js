import consumerApi from './consumerApi';

describe('Testing consumerApi', () => {
  const mainWindow = {
    webContents: {
      send: (message, data) => {
        console.log(data);
      },
    },
  };
  describe('getLatestOffset should return a number', () => {
    it('Should return a number', () =>
      consumerApi.getLatestOffset('k2.tpw.made.industries:9092', 'swipes', 0).then(result => {
        expect(result).toBeGreaterThanOrEqual(0);
      }));
  });
});
