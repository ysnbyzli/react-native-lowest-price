import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {COLORS} from '../constants';
import {selectUser} from '../store/userSlice';

const CustomAvatar = () => {
  const user = useSelector(selectUser);

  return (
    <Container>
      <Text>
        {user.firstName.slice(0, 1).toUpperCase()}
        {user.lastName.slice(0, 1).toUpperCase()}
      </Text>
    </Container>
  );
};

const Container = styled.View`
  width: 70px;
  height: 70px;
  text-align: center;
  border-radius: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.primary};
`;
const Text = styled.Text`
  color: ${COLORS.white};
  font-size: 20px;
  letter-spacing: 3px;
`;

export default CustomAvatar;
