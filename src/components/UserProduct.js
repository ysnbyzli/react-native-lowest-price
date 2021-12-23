import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../constants';
import {getRelativeTime} from '../utils/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback, View} from 'react-native';

const UserProduct = ({item, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Image source={{uri: item.image}} resizeMode="cover" />
        <Content>
          <Title>{item.title}</Title>
          <Time>{getRelativeTime(item.createdAt)}</Time>
        </Content>
        <ButtonDelete onPress={() => handleDelete(item)}>
          <View style={{marginLeft: 'auto'}}>
            <Icon
              name="remove-circle"
              size={22}
              style={{color: COLORS.danger}}
            />
          </View>
        </ButtonDelete>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${COLORS.white};
`;
const Image = styled.Image`
  height: 80px;
  width: ${SIZES.width * 0.3}px;
  border-radius: 10px;
`;

const Content = styled.View`
  padding: 0 10px;
`;
const Title = styled.Text`
  font-family: ${FONTS.bold};
  color: ${COLORS.black};
`;

const Time = styled.Text`
  font-family: ${FONTS.medium};
  font-size: 12px;
`;

const ButtonDelete = styled.TouchableWithoutFeedback`
  margin-left: auto;
`;

export default UserProduct;
