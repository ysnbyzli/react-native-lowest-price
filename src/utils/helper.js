import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRelativeTime = time => {
  return moment(time).fromNow();
};

export const getCalendar = time => {
  return moment(time).calendar();
};

export const getStoreData = () => {
  AsyncStorage.getItem('token').then(response => {
    return response;
  });
};
