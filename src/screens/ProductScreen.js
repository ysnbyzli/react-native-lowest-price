import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import CurrencyInput from 'react-native-currency-input';

import {COLORS, FONTS, images, SIZES} from '../constants';
import api from '../utils/api';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';

import Record from '../components/Record';
import CustomModal from '../components/Modal/CustomModal';
import {selectUser} from '../store/userSlice';
import FloatingButton from '../components/FloatingButton';
import Button from '../components/Form/Button';
import Favorite from '../components/Favorite';
import RandomProduct from '../components/RandomProduct';

const headerComponent = (product, sort, handleChangeSort) => {
  return (
    <View>
      <ProductImage source={{uri: product?.image}} resizeMode="cover" />
      <Info>
        <View>
          <Title>{product?.title}</Title>
        </View>
        <Price>{product?.barcod}</Price>
      </Info>
      <RecordHeader>
        <Icon
          name={sort === 'increase' ? 'sort-numeric-asc' : 'sort-numeric-desc'}
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
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(0);

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

  const addProductRecordPrice = async (id, price) => {
    const token = await AsyncStorage.getItem('token');
    try {
      setLoading(true);
      const body = {
        price: Number(price),
        product: id,
      };
      const response = await api().post('/records', body, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const newRecord = {
        ...response.data,
        user: {
          profile_image: user.profile_image,
          username: user.username,
        },
      };
      setRecords([newRecord, ...records]);
      setLoading(false);
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'Price successfully added',
      });
      setModalVisible(false);
    } catch (error) {
      setError(error.response.data);
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
    if (product) {
      fetchProductRecords();
    }
  }, [product]);

  const renderRecord = ({item}) => {
    return <Record record={item} />;
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
          {/* {user && (
            <>
              <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}>
                <ModalHeader>
                  <ModalTitle>{product?.title.toUpperCase()}</ModalTitle>
                  <ModalCancel onPress={() => setModalVisible(false)}>
                    Cancel
                  </ModalCancel>
                </ModalHeader>
                <Text style={{marginVertical: 10}}>Price</Text>
                <View
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                  }}>
                  <CurrencyInput
                    value={price}
                    onChangeValue={setPrice}
                    prefix="$ "
                    delimiter=","
                    separator="."
                    precision={2}
                  />
                </View>
                <Button
                  text="Add Price"
                  onPress={() => addProductRecordPrice(product_id, price)}
                  loading={loading}
                />
              </CustomModal>
              <FloatingButton onPress={() => setModalVisible(true)} />
            </>
          )} */}
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
  margin-top: 10px;
`;

const Title = styled.Text`
  font-family: ${FONTS.semiBold};
  color: ${COLORS.black};
  font-size: 15px;
`;

const Price = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
`;

const RecordHeader = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ModalTitle = styled.Text`
  font-family: ${FONTS.semiBold};
  color: ${COLORS.primary};
`;

const ModalCancel = styled.Text`
  color: ${COLORS.danger};
  font-family: ${FONTS.regular};
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
