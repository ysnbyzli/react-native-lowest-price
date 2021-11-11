import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const SIZES = {
  width,
  height,
};

export const FONTS = {
  bold: 'OpenSans-Bold',
  light: 'OpenSans-Light',
  medium: 'OpenSans-Medium',
  regular: 'OpenSans-Regular',
  semiBold: 'OpenSans-SemiBold',
};

export const COLORS = {
  btn: '#40B574',
  white: '#ffffff',
  black: '#000000',
  active: '#40B574',
  in_active: '#EEF4F1',
};

const appTheme = {SIZES, FONTS, COLORS};

export default appTheme;
