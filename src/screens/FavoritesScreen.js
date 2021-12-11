import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import FavoriteItem from '../components/FavoriteItem';
import {selectFavorites} from '../store/favoriteSlice';

const FavoritesScreen = () => {
  const favorites = useSelector(selectFavorites);

  const renderProduct = ({item}) => {
    return <FavoriteItem item={item} />;
  };

  const renderProductKey = item => item._id.toString();

  return (
    <FlatList
      data={favorites}
      renderItem={renderProduct}
      keyExtractor={renderProductKey}
    />
  );
};

export default FavoritesScreen;
