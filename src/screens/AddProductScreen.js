import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import styled from 'styled-components';
import {useFormik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {addProduct, changeError, changeSuccess} from '../store/productSlice';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import BottomModal from '../components/Modal/BottomModal';
import Item from '../components/Profile/Item';
import CustomButton from '../components/CustomButton';
import {COLORS, images, SIZES} from '../constants';
import {showMessage} from 'react-native-flash-message';

const AddProductScreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const {loading, error, isAddSuccess} = useSelector(state => state.products);

  useEffect(() => {
    if (isAddSuccess) {
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'You have successfully added the product.',
      });
      navigation.navigate('HomeScreen');
      dispatch(changeSuccess(false));
    }
  }, [isAddSuccess]);

  const dispatch = useDispatch();

  const onHandleModalShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.message,
      });
    }
    dispatch(changeError(null));
  }, [loading, error]);

  const onHandleModalClose = () => {
    setShow(false);
  };

  const handleChangeImageFromCamera = async () => {
    await launchCamera({mediaType: 'photo', quality: 1}, res => {
      if (res.didCancel) return;
      setImage({
        uri: res.assets[0].uri,
        type: res.assets[0].type,
        name: res.assets[0].fileName,
      });
      onHandleModalClose();
    });
  };

  const handleChangeImageFromGallery = async () => {
    await launchImageLibrary({}, res => {
      if (res.didCancel) return;
      setImage({
        uri: res.assets[0].uri,
        type: res.assets[0].type,
        name: res.assets[0].fileName,
      });
      onHandleModalClose();
    });
  };

  const handleAddProduct = values => {
    if (!image)
      return showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'You must choose a picture!',
      });

    const formData = new FormData();
    formData.append('image', {
      name: new Date() + '_image',
      uri: image.uri,
      type: image.type,
    });
    formData.append('title', values.title.toString());
    formData.append('price', values.price.toString());
    formData.append('barcod', values.barcod.toString());
    dispatch(addProduct(formData));
  };

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      title: '',
      price: '',
      barcod: '',
    },
    onSubmit: values => {
      handleAddProduct(values);
    },
  });

  return (
    <Container>
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <ScrollView style={{flex: 1}}>
        <HandleImage onPress={onHandleModalShow}>
          <ImageContent>
            {image ? (
              <ProductImage source={{uri: image.uri}} resizeMode="cover" />
            ) : (
              <Image
                source={images.images}
                style={{width: SIZES.width * 0.9, height: 220}}
              />
            )}
          </ImageContent>
        </HandleImage>
        <Input
          value={values.title}
          onChangeText={handleChange('title')}
          label="Title"
        />
        <Input
          value={values.price}
          onChangeText={handleChange('price')}
          label="Price"
        />
        <Input
          value={values.barcod}
          onChangeText={handleChange('barcod')}
          label="Barcod"
        />
        <Button
          text="Add Product"
          onPress={() => handleSubmit()}
          loading={loading}
        />
        <BottomModal
          onTouchOutSide={onHandleModalClose}
          isShow={show}
          onHandleModalClose={onHandleModalClose}>
          <Item
            icon="camera-outline"
            title="Take a photo from the camera"
            onPress={handleChangeImageFromCamera}
          />
          <Item
            icon="images-outline"
            title="Select photo from gallery"
            onPress={handleChangeImageFromGallery}
          />
          <CustomButton
            text="CANCEL"
            bg={COLORS.danger}
            onPress={onHandleModalClose}
            padding={10}
          />
        </BottomModal>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const Header = styled.View``;

const HandleImage = styled.TouchableWithoutFeedback``;

const ImageContent = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

const ProductImage = styled.Image`
  width: ${SIZES.width * 0.9}px;
  height: 220px;
  border-radius: 20px;
`;

export default AddProductScreen;
