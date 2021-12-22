import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import Product from '../components/Product';
const RandomProduct = () => {
  const products = useSelector(state => state.products.data);

  const randomProducts = () => {};

  return (
    <Container>
      <Product product={products[0]} />
      <Product product={products[1]} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
`;

export default RandomProduct;
