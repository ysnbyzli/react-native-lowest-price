import moment from 'moment';

export const getRelativeTime = time => {
  return moment(time).fromNow();
};
