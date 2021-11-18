import React from 'react';
import {View, Text, Modal, TouchableWithoutFeedback} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const BottomModal = ({
  onTouchOutSide,
  title,
  isShow,
  onHandleModalClose,
  children,
}) => {
  const onRenderOutsideTouchable = onTouch => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={onHandleModalClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}>
        {onRenderOutsideTouchable(onTouchOutSide)}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingHorizontal: 10,
            maxHeight: SIZES.height * 0.4,
          }}>
          <View>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 20,
                margin: 15,
                marginLeft: 20,
                fontFamily: FONTS.semiBold,
              }}>
              {title}
            </Text>
            <View style={{margin: 15, marginTop: 0}}>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
