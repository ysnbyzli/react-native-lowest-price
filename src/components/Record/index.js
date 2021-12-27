import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {formatNumber} from 'react-native-currency-input';

import styled from 'styled-components/native';
import {COLORS, FONTS} from '../../constants';
import {getRelativeTime} from '../../utils/helper';

// navigation.navigate('ProductScreen', {product_id: record.product._id})
const Record = ({record, navigation, setSearch}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductScreen', {product_id: record.product._id});
        setSearch('');
      }}>
      <Container>
        <Content>
          <Avatar
            source={{uri: record?.user.profile_image}}
            resizeMode="contain"
          />
          <View style={{marginLeft: 8}}>
            <Market>{record?.market}</Market>
            <Name>@{record?.user.username}</Name>
          </View>
        </Content>
        <Price>
          {formatNumber(record?.price, {
            separator: ',',
            prefix: '$ ',
            precision: 2,
            delimiter: '.',
            signPosition: 'beforePrefix',
          })}
        </Price>
        <Time>{getRelativeTime(record?.createdAt)}</Time>
      </Container>
    </TouchableOpacity>
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
  flex-direction: row;
  align-items: center;
`;

const Price = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
`;

const Avatar = styled.Image`
  height: 45px;
  width: 45px;
  border-radius: 20px;
`;

const Market = styled.Text`
font-family: ${FONTS.regular}
  color: ${COLORS.black};
`;

const Name = styled.Text`
  color: ${COLORS.gray};
  font-size: 12px;
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
