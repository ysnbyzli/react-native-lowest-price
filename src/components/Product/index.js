import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS} from '../../constants';
import {getRelativeTime} from '../../utils/helper';

const Product = ({product, onPress}) => {
  return (
    <Container onPress={onPress}>
      <Content>
        <Image source={{uri: product.image}} resizeMode="cover" />
        <Body>
          <Title>{product.title}</Title>
          <Time>{getRelativeTime(product.updatedAt)}</Time>
        </Body>
      </Content>
    </Container>
  );
};

const Container = styled.TouchableWithoutFeedback``;

const Content = styled.View`
  margin: 10px;
  flex: 1;

  border-radius: 10px;
`;

const Image = styled.Image`
  min-height: 180px;
  border-radius: 10px;
`;

const Body = styled.View`
  padding: 6px;
`;

const Title = styled.Text`
  font-family: ${FONTS.semiBold};
  color: ${COLORS.black};
`;

const Time = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  font-family: ${FONTS.regular};
  color: ${COLORS.gray};
`;
export default Product;
