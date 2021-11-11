import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {COLORS, FONTS} from '../constants';
import {selectUser} from '../store/userSlice';

const Avatar = () => {
  const user = useSelector(selectUser);

  return (
    <Container>
      <Image source={require('../assets/images/avatar.png')} />
      <TextBox>
        <Name>
          {user.firstName} {user.lastName}
        </Name>
        <Username>@{user.username}</Username>
      </TextBox>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
`;
const Image = styled.Image`
  margin-left: 15px;
`;
const TextBox = styled.View`
  margin-left: 15px;
  justify-content: center;
`;
const Name = styled.Text`
  font-family: ${FONTS.bold};
  color: ${COLORS.white};
`;
const Username = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.white};
  font-size: 10px;
  letter-spacing: 0.6px;
`;

export default Avatar;
