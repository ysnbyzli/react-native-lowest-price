import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {useFormik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CurrencyInput from 'react-native-currency-input';
import {Picker} from '@react-native-picker/picker';

import {addProduct, changeError, changeSuccess} from '../store/productSlice';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import BottomModal from '../components/Modal/BottomModal';
import Item from '../components/Profile/Item';
import CustomButton from '../components/CustomButton';
import {COLORS, FONTS, images, SIZES} from '../constants';
import {showMessage} from 'react-native-flash-message';
import {selectCategories} from '../store/categorySlice';
import addProductSchema from '../validations/addProductSchema';

const AddProductScreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {loading, error, isAddSuccess} = useSelector(state => state.products);

  const categories = useSelector(selectCategories);

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
        message: error,
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
    formData.append('price', price);
    formData.append('barcod', values.barcod.toString());
    formData.append('market', values.market.toString());
    formData.append('description', values.description.toString());
    formData.append('category', selectedCategory);
    dispatch(addProduct(formData));
  };

  const {handleSubmit, handleBlur, handleChange, values, errors, touched} =
    useFormik({
      initialValues: {
        title: '',
        price: '',
        barcod: '',
        market: '',
        description: '',
      },
      validationSchema: addProductSchema,
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
      <ScrollView
        style={{flex: 1, marginVertical: 15}}
        showsVerticalScrollIndicator={false}>
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
          error={errors.title}
          touched={touched.title}
          onBlur={handleBlur('title')}
        />
        <Input
          value={values.market}
          onChangeText={handleChange('market')}
          label="Market"
          error={errors.market}
          touched={touched.market}
          onBlur={handleBlur('market')}
        />
        <View>
          <Text style={{paddingLeft: 8, marginTop: 8}}>Description</Text>
          <InputWrapper
            error={errors.description}
            touched={touched.description}>
            <TextInput
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              multiline={true}
              style={{textAlignVertical: 'top', height: 150}}
              maxLength={299}
            />
          </InputWrapper>
          {errors.description && touched.description && (
            <ErrorText>{errors.description}</ErrorText>
          )}
        </View>
        <View>
          <Text style={{paddingLeft: 8, marginTop: 8}}>Price</Text>
          <View
            style={{
              backgroundColor: '#f1eded',
              borderRadius: 10,
              marginTop: 12,
              paddingLeft: 12,
            }}>
            <CurrencyInput
              value={price}
              onChangeValue={setPrice}
              prefix="$"
              delimiter=","
              separator="."
              precision={2}
            />
          </View>
        </View>
        <Input
          value={values.barcod}
          onChangeText={handleChange('barcod')}
          label="Barcod"
          error={errors.barcod}
          touched={touched.barcod}
          onBlur={handleBlur('barcod')}
        />
        <View>
          <Text style={{paddingLeft: 8, marginTop: 8}}>Category</Text>
          <View
            style={{
              backgroundColor: '#f1eded',
              borderRadius: 10,
              marginTop: 12,
              paddingLeft: 12,
            }}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={itemValue => setSelectedCategory(itemValue)}>
              {categories.map(category => (
                <Picker.Item
                  label={category.title}
                  value={category._id}
                  key={category._id}
                />
              ))}
            </Picker>
          </View>
        </View>

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

const InputWrapper = styled.View`
  background-color: #f1eded;
  width: 100%;
  border-radius: 10px;
  padding-left: 12px;
  margin-top: 18px;
  border: ${props => (props.error && props.touched ? '#ff4f4f' : '#f1eded')};
`;

const ErrorText = styled.Text`
  font-family: ${FONTS.regular};
  color: #ff4f4f;
  font-size: 13px;
  margin-left: 5px;
  font-style: italic;
`;

export default AddProductScreen;
