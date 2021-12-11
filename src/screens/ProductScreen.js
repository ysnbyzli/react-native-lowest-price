import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {COLORS, FONTS, SIZES} from '../constants';
import api from '../utils/api';
import {FlatList, Text, TextInput, View} from 'react-native';
import Record from '../components/Record';
import CustomModal from '../components/Modal/CustomModal';
import {selectUser} from '../store/userSlice';
import FloatingButton from '../components/FloatingButton';
import Button from '../components/Form/Button';
import {showMessage} from 'react-native-flash-message';
import Favorite from '../components/Favorite';

const ProductScreen = ({route, navigation}) => {
  const user = useSelector(selectUser);

  const {product_id} = route.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [records, setRecords] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState('0');

  const fetchProduct = async () => {
    try {
      const response = await api().get(`/products/${product_id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductRecords = async () => {
    try {
      const response = await api().get(`/products/records/${product_id}`);
      setRecords(response.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchProduct();
    fetchProductRecords();
  }, []);

  useEffect(() => {
    if (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.message,
      });
      setError(null);
    }
  }, [loading, error]);

  const renderRecord = ({item}) => {
    return <Record record={item} />;
  };

  const renderRecordKey = item => item._id.toString();

  return (
    <Container>
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          style={{color: COLORS.black}}
          onPress={() => navigation.goBack()}
        />
        {/* ! FAVORITE */}
        {user && product && <Favorite product={product} />}
      </Header>
      <Body>
        <ProductImage source={{uri: product?.image}} resizeMode="cover" />
        <Info>
          <Title>{product?.title}</Title>
          <Price>{product?.price}</Price>
        </Info>
        <RecordHeader>
          <Text
            style={{
              color: COLORS.black,
              fontFamily: FONTS.regular,
            }}>
            Price List
          </Text>
          <Text>Filtre</Text>
        </RecordHeader>
        <FlatList
          data={records}
          renderItem={renderRecord}
          keyExtractor={renderRecordKey}
        />
      </Body>
      {user && (
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
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: COLORS.black,
                borderWidth: 1,
              }}>
              <TextInput
                style={{
                  color: COLORS.black,
                }}
                value={price}
                keyboardType="number-pad"
                onChangeText={value => setPrice(value)}
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
  margin-top: 10px;
  margin-bottom: 10px;
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

export default ProductScreen;
