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
  primary: '#40B574',
  btn: '#40B574',
  white: '#ffffff',
  black: '#000000',
  active: '#40B574',
  in_active: '#EEF4F1',
  danger: '#e74c3c',
  warning: '#f0ad4e',
  success: '#22bb33',
  gray: '#808080',
};

export const slides = [
  {
    id: '1',
    title: 'Sign In To The App.',
    description:
      'By logging into the application, you can access the features of adding products, adding prices and adding the product to favourites.',
    image: require('../assets/images/undraw_Access_account_re_8spm.png'),
  },
  {
    id: '2',
    title: 'Discounted Products',
    description:
      'You can find the cheapest product starting from the starting prices of the products.',
    image: require('../assets/images/undraw_discount_d4bd.png'),
  },
  {
    id: '3',
    title: 'Profile Update',
    description: 'You can update your profile as you wish and add photos.',
    image: require('../assets/images/undraw_Edit_photo_re_ton4.png'),
  },
  {
    id: '4',
    title: 'Product Search',
    description:
      'You can easily search for the product you want and access information about the product',
    image: require('../assets/images/undraw_Select_re_3kbd.png'),
  },
];

const appTheme = {SIZES, FONTS, COLORS, slides};

export default appTheme;
