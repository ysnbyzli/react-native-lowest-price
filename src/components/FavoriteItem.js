import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../constants';
import {getRelativeTime} from '../utils/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteProductToFavorites} from '../store/favoriteSlice';

const FavoriteItem = ({item}) => {
  const dispatch = useDispatch();

  const handleDelete = item => {
    dispatch(deleteProductToFavorites(item));
  };

  return (
    <Container>
      <Image source={{uri: item.product.image}} resizeMode="cover" />
      <Content>
        <Title>{item.product.title}</Title>
        <Time>{getRelativeTime(item.createdAt)}</Time>
      </Content>
      <ButtonDelete onPress={() => handleDelete(item)}>
        <View style={{marginLeft: 'auto'}}>
          <Icon
            name="remove-circle-outline"
            size={22}
            style={{color: COLORS.danger}}
          />
        </View>
      </ButtonDelete>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${COLORS.white};
`;
const Image = styled.Image`
  height: 80px;
  width: ${SIZES.width * 0.3}px;
`;

const Content = styled.View`
  padding: 0 10px;
`;
const Title = styled.Text`
  font-family: ${FONTS.bold};
  color: ${COLORS.black};
`;

const Time = styled.Text`
  font-family: ${FONTS.medium};
  font-size: 12px;
`;

const ButtonDelete = styled.TouchableWithoutFeedback`
  margin-left: auto;
`;
export default FavoriteItem;
