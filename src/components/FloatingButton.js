import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../constants';

const FloatingButton = ({onPress}) => {
  return (
    <Button onPress={onPress}>
      <Icon>+</Icon>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background-color: ${COLORS.primary};
  border-radius: 45px;
`;

const Icon = styled.Text`
  color: ${COLORS.white};
  font-size: 25px;
`;

export default FloatingButton;
