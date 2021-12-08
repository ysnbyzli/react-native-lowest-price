import React from 'react';
import {View, Text, Modal} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const CustomModal = ({modalVisible, setModalVisible, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log('tıklandı');
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: SIZES.width * 0.9,
            padding: 25,
            borderRadius: 10,
            shadowColor: '#000',
            zIndex: 100000,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
