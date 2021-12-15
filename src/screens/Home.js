import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {fetchAllProduct} from '../store/productSlice';
import {selectUser} from '../store/userSlice';
import Header from '../components/Header';
import Product from '../components/Product';
import FloatingButton from '../components/FloatingButton';
import {
  changeFavoriteSuccess,
  fetchAllFavorites,
  selectFavorites,
} from '../store/favoriteSlice';

const Home = ({navigation}) => {
  const products = useSelector(state => state.products.data);
  const favorites = useSelector(selectFavorites);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  useEffect(() => {
    if (user && favorites.length == 0) {
      dispatch(fetchAllFavorites());
      changeFavoriteSuccess(false);
    }
  }, [user]);

  const renderProduct = ({item}) => {
    return (
      <Product
        product={item}
        onPress={() =>
          navigation.navigate('ProductScreen', {product_id: item._id})
        }
      />
    );
  };

  const renderProductKey = item => item._id.toString();

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={renderProduct}
        keyExtractor={renderProductKey}
      />
      {user && (
        <FloatingButton
          onPress={() => navigation.navigate('AddProductScreen')}
        />
      )}
    </View>
  );
};

export default Home;
