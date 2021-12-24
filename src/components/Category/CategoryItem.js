import React from 'react';
import {TouchableNativeFeedback, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {COLORS, FONTS} from '../../constants';
import {changeActiveCategory} from '../../store/productSlice';

const CategoryItem = ({category: {title, image}}) => {
  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback
      onPress={() => dispatch(changeActiveCategory(title))}>
      <Container>
        <Image source={{uri: image}} resizeMode="contain" />
        <Title>{title}</Title>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  align-items: center;
  margin-vertical: 8px;
  margin-right: 15px;
  width: 80px;
  border-radius: 10px;
`;

const Image = styled.Image`
  height: 24px;
  width: 24px;
`;

const Title = styled.Text`
  margin-top: 10px;
  font-family: ${FONTS.bold}
  color: ${COLORS.black};
  font-size: 10px;
`;

export default CategoryItem;
