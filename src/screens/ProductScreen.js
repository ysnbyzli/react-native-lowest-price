import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, images, SIZES} from '../constants';
import api from '../utils/api';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import Record from '../components/Record';
import {selectUser} from '../store/userSlice';
import Favorite from '../components/Favorite';
import RandomProduct from '../components/RandomProduct';
import {getCalendar} from '../utils/helper';
const headerComponent = (product, sort, handleChangeSort) => {
  return (
    <View>
      <ProductImage source={{uri: product?.image}} resizeMode="cover" />
      <Info>
        <View>
          <Market>{product?.market}</Market>
          <Title>{product?.title}</Title>
        </View>
        <View>
          <Price>
            <Text style={{color: COLORS.black, fontFamily: FONTS.semiBold}}>
              Barcod:
            </Text>{' '}
            {product?.barcod}
          </Price>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.gray,
              fontSize: 10,
            }}>
            {getCalendar(product?.createdAt)}
          </Text>
        </View>
      </Info>
      <Desc>{product?.description}</Desc>
      <RecordHeader>
        <AntDesign
          name={'filter'}
          size={22}
          style={{color: '#30336b', marginLeft: 'auto'}}
          onPress={handleChangeSort}
        />
      </RecordHeader>
    </View>
  );
};

const ProductScreen = ({route, navigation}) => {
  const user = useSelector(selectUser);
  const [sort, setSort] = useState('');

  const {product_id, isBarcod, barcod} = route.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [records, setRecords] = useState([]);

  const fetchProductById = async () => {
    try {
      const response = await api().get(`/products/${product_id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  const fetchProductByBarcod = async () => {
    try {
      const response = await api().get(`/products/barcod/${barcod}`);
      setProduct(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const fetchProductRecords = async () => {
    try {
      setLoading(true);
      const response = await api().get(`/products/records/${product._id}`);
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangeSort = () => {
    if (sort === '' || sort === 'decrease') {
      setSort('increase');
    } else {
      setSort('decrease');
    }
  };

  useEffect(() => {
    if (isBarcod) {
      fetchProductByBarcod();
    } else if (product_id) {
      fetchProductById();
    }
  }, []);

  useEffect(() => {
    if (product_id) {
      fetchProductById();
    }
  }, [product_id]);

  useEffect(() => {
    if (product) {
      fetchProductRecords();
    }
  }, [product]);

  const renderRecord = ({item}) => {
    return <Record record={item} navigation={navigation} />;
  };

  const renderRecordKey = item => item._id.toString();

  const filteredRecord =
    sort == ''
      ? records
      : sort == 'increase'
      ? records.sort((a, b) => a.price - b.price)
      : records.sort((a, b) => b.price - a.price);

  return (
    <Container>
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          style={{color: COLORS.black}}
          onPress={() => navigation.goBack()}
        />
        {user && product && <Favorite product={product} />}
      </Header>
      {error ? (
        <NotFound>
          <NotFoundImage source={images.not_found} resizeMode="contain" />
          <RandomProduct />
        </NotFound>
      ) : (
        <>
          <Body>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={27} />
              </View>
            ) : (
              <View style={{flex: 1}}>
                {records.length > 0 ? (
                  <FlatList
                    data={filteredRecord}
                    renderItem={renderRecord}
                    keyExtractor={renderRecordKey}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={headerComponent(
                      product,
                      sort,
                      handleChangeSort,
                    )}
                  />
                ) : (
                  <>
                    {headerComponent(product, sort, handleChangeSort)}
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={images.empty}
                        style={{width: SIZES.width * 0.8, height: 320}}
                        resizeMode="cover"
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          </Body>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Body = styled.View`
  flex: 1;
  padding: 10px;
`;

const ProductImage = styled.Image`
  height: ${SIZES.height / 3}px;
  min-width: 100%;
  border-radius: 15px;
`;

const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Desc = styled.Text`
  margin-top: 10px;
  text-align: justify;
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
`;

const Market = styled.Text`
  font-family: ${FONTS.bold};
  color: ${COLORS.black};
  font-size: 14px;
`;

const Title = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.gray};
  font-size: 10px;
`;

const Price = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
  font-size: 10px;
`;

const RecordHeader = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const NotFound = styled.View`
  flex: 1;
  align-items: center;
`;

const NotFoundImage = styled.Image`
  width: ${SIZES.width * 0.8}px;
  height: 300px;
`;

export default ProductScreen;
