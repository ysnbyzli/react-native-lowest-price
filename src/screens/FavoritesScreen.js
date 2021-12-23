import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {selectFavorites} from '../store/favoriteSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS, images, SIZES, FONTS} from '../constants';
import FavoriteItem from '../components/FavoriteItem';

const FavoritesScreen = ({navigation}) => {
  const favorites = useSelector(selectFavorites);

  const renderProduct = ({item}) => {
    return (
      <FavoriteItem
        item={item}
        onPress={() => {
          navigation.navigate('ProductScreen', {product_id: item.product._id});
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
        {favorites.length > 0 && (
          <Text>
            {favorites.length} item{favorites.length > 1 && 's'}
          </Text>
        )}
      </Header>
      {favorites.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={images.empty_box}
            resizeMode="cover"
            style={{width: SIZES.width * 0.9, height: 250}}
          />
          <EmptyText>There are no products in your favourites.</EmptyText>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderProduct}
          keyExtractor={renderProductKey}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const EmptyText = styled.Text`
  margin-vertical: 15px;
  font-family: ${FONTS.regular};
  color: ${COLORS.gray};
`;

export default FavoritesScreen;
