import React from 'react';

import styled from 'styled-components/native';
import {COLORS, FONTS} from '../../constants';

const Record = ({record}) => {
  return (
    <Container>
      <Price>{record.price}</Price>
      <Avatar source={{uri: record.user.profile_image}} resizeMode="contain" />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.white};
  border-radius: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Price = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
`;

const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 100px;
`;

export default Record;
