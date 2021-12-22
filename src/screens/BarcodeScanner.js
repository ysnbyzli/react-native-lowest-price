import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';

import ScanBarcod from 'react-native-scan-barcode';

const BarcodeScanner = ({navigation}) => {
  const [touchMode, setTouchMode] = useState('on');
  const [cameraType, setCameraType] = useState('back');

  const barcodeReceived = e => {
    navigation.navigate('ProductScreen', {barcod: e.data, isBarcod: true});
  };

  return (
    <ScanBarcod
      onBarCodeRead={barcodeReceived}
      style={{flex: 1}}
      torchMode={touchMode}
      cameraType={cameraType}
    />
  );
};

export default BarcodeScanner;
