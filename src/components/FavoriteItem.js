import React from 'react';

import styled from 'styled-components/native';

const FavoriteItem = ({item}) => {
  console.log(item);
  return (
    <Container>
      <Image source={{uri: item.product.image}} />
      <Content>
        <Title>{item.product.title}s</Title>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
`;
const Image = styled.Image``;

const Content = styled.View``;
const Title = styled.Text``;
export default FavoriteItem;
