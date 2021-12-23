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
              width: 10,
              height: 10,
            },
            shadowOpacity: 0.75,
            shadowRadius: 8,
            elevation: 10,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
