import axios from 'axios';
import Config from 'react-native-config';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return axios.create({
    baseURL: `${Config.API_URL}`,
  });
};
