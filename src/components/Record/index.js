import React from 'react';
import {formatNumber} from 'react-native-currency-input';

import styled from 'styled-components/native';
import {COLORS, FONTS} from '../../constants';
import {getRelativeTime} from '../../utils/helper';
const Record = ({record}) => {
  return (
    <Container>
      <Content>
        <Avatar
          source={{uri: record.user.profile_image}}
          resizeMode="contain"
        />
        <Name>{record.user.username}</Name>
      </Content>
      <Price>
        {formatNumber(record.price, {
          separator: ',',
          prefix: '$ ',
          precision: 2,
          delimiter: '.',
          signPosition: 'beforePrefix',
        })}
      </Price>
      <Time>{getRelativeTime(record.createdAt)}</Time>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.white};
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Content = styled.View`
  align-items: center;
`;

const Price = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
`;

const Avatar = styled.Image`
  height: 40px;
  width: 45px;
  border-radius: 20px;
`;

const Name = styled.Text`
  margin-top: 5px;
  color: ${COLORS.black};
`;

const Time = styled.Text`
  font-size: 10px;
  color: ${COLORS.gray};
  position: absolute;
  bottom: 10px;
  right: 10px;
  letter-spacing: 1.2px;
`;

export default Record;
