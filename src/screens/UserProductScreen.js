import React, {useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {fetchAllUserProducts, selectUserProducts} from '../store/productSlice';
import {COLORS} from '../constants';
import UserProduct from '../components/UserProduct';

const UserProductScreen = ({navigation}) => {
  const products = useSelector(selectUserProducts);

  const dispatch = useDispatch();

  // * Sayfa yuklenildiginde kullanıcıya ait verileri cekme
  useEffect(() => {
    dispatch(fetchAllUserProducts());
  }, []);

  const renderProduct = ({item}) => {
    return (
      <UserProduct
        item={item}
        onPress={() => {
          navigation.navigate('ProductScreen', {product_id: item._id});
        }}
      />
    );
  };

  const renderProductKey = item => item._id.toString();

  return (
    <Container>
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          color={COLORS.black}
          onPress={() => navigation.goBack()}
        />
        {products.length > 0 && (
          <Text>
            {products.length} item{products.length > 1 && 's'}
          </Text>
        )}
      </Header>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={renderProductKey}
      />
    </Container>
  );
};

const Container = styled.View``;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export default UserProductScreen;
