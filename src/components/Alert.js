import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS} from '../constants';

const Alert = ({type, text}) => {
  return (
    <Container type={type}>
      <Ionicons
        name={
          type === 'danger'
            ? 'alert'
            : type === 'success'
            ? 'checkmark-outline'
            : 'information'
        }
        size={22}
        color={COLORS.white}
      />
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${props =>
    props.type === 'danger'
      ? COLORS.danger
      : props.type === 'success'
      ? COLORS.success
      : COLORS.warning};
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  color: ${COLORS.white};
  font-family: ${FONTS.regular};
`;

export default Alert;
