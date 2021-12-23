import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS, FONTS} from '../../constants';
import {deleteProduct, selectUserProducts} from '../../store/productSlice';
import {getRelativeTime} from '../../utils/helper';
import CustomModal from '../Modal/CustomModal';

const Product = ({product, onPress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const userProducts = useSelector(selectUserProducts);

  const isExists = userProducts.some(item => item._id === product._id);

  const handleDelete = () => {
    dispatch(deleteProduct(product._id));
    setModalVisible(false);
  };

  return (
    <Container onPress={onPress}>
      <Content>
        <Image source={{uri: product.image}} resizeMode="contain" />
        <Body>
          <Title>{product.title}</Title>
          <Time>{getRelativeTime(product.updatedAt)}</Time>
        </Body>
        {isExists && (
          <DeleteIcon
            name="delete"
            size={22}
            onPress={() => setModalVisible(true)}
          />
        )}
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <Text style={{marginBottom: 10, fontFamily: FONTS.regular}}>
            Are you sure you want to delete the product?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.danger,
                alignItems: 'center',
                width: 100,
                paddingVertical: 5,
                borderRadius: 10,
              }}
              onPress={handleDelete}>
              <Text style={{color: COLORS.white}}>Delete</Text>
            </TouchableOpacity>
            <Text onPress={() => setModalVisible(false)}>Cancel</Text>
          </View>
        </CustomModal>
      </Content>
    </Container>
  );
};

const Container = styled.TouchableWithoutFeedback``;

const Content = styled.View`
  margin: 10px;
  flex: 1;
  position: relative;
  border-radius: 10px;
`;

const Image = styled.Image`
  min-height: 180px;
  border-radius: 10px;
`;

const Body = styled.View`
  padding: 6px;
`;

const DeleteIcon = styled(AntDesign)`
  position: absolute;
  top: 20px;
  right: 10px;
  color: ${COLORS.danger};
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
