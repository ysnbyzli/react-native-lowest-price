import React from 'react';
import styled from 'styled-components';
import {COLORS, FONTS} from '../../constants';

const Button = ({text, onPress, loading}) => {
  return (
    <StyledButton onPress={onPress} disabled={loading}>
      {loading ? (
        <Indicator size="small" color="#ffffff" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: ${COLORS.btn};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: 45px;
  margin-top: 18px;
  width: 100%;
`;
const ButtonText = styled.Text`
  font-size: 17px;
  color: ${COLORS.white};
  font-family: ${FONTS.regular};
`;

const Indicator = styled.ActivityIndicator``;

export default Button;
