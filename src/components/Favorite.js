import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  addProductToFavorites,
  changeFavoriteError,
  changeFavoriteSuccess,
  deleteProductToFavorites,
} from '../store/favoriteSlice';
import {showMessage} from 'react-native-flash-message';

const Favorite = ({product_id}) => {
  const {error, isSuccess, data} = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteItem = data?.find(item => item.product._id == product_id);
    setIsFavorite(favoriteItem ? true : false);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'Products have been added to favorites successfully',
      });
      dispatch(changeFavoriteSuccess(false));
    }
    if (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'An error occurred while adding to favourites.',
      });
      dispatch(changeFavoriteError(false));
    }
  }, [isSuccess, error]);

  const handleAddToFavorite = () => {
    if (isFavorite) {
      dispatch(deleteProductToFavorites(product_id));
    } else {
      dispatch(addProductToFavorites(product_id));
    }
  };

  return (
    <Container onPress={handleAddToFavorite}>
      <Content>
        <FavoriteIcon name="favorite" size={22} isFavorite={isFavorite} />
      </Content>
    </Container>
  );
};

const Container = styled.TouchableWithoutFeedback``;

const Content = styled.View`
  padding: 10px;
  border-radius: 100px;
  background-color: #bdc3c7;
`;

const FavoriteIcon = styled(MaterialIcons)`
  color: ${props => (props.isFavorite ? '#e74c3c' : '#6d6d6d')};
`;

export default Favorite;
