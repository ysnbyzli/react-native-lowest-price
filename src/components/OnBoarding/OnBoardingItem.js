import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../constants';

const OnBoardingItem = ({item}) => {
  return (
    <Container>
      <Image source={item.image} resizeMode="contain" />
      <Content>
        <Title>{item.title}</Title>
        <Desc>{item.description}</Desc>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.white};
`;

const Image = styled.Image`
  flex: 0.7;
  justify-content: center;
  width: ${SIZES.width}px;
`;

const Content = styled.View`
  flex: 0.3;
  padding: 0 50px;
  width: ${SIZES.width}px;
`;
const Title = styled.Text`
  text-align: center;
  color: ${COLORS.primary};
  font-family: ${FONTS.semiBold};
  font-size: 22px;
  font-weight: 900;
`;

const Desc = styled.Text`
  text-align: center;
  font-family: ${FONTS.regular};
  font-size: 12px;
  color: #62656b;
`;

export default OnBoardingItem;
