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
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            paddingHorizontal: 10,
            paddingVertical: 20,
            maxHeight: SIZES.height * 0.4,
          }}>
          <View>
            {title && (
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
            )}
            <View style={{margin: 15, marginTop: 0}}>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
