import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useFormik} from 'formik';
import {showMessage} from 'react-native-flash-message';

import {COLORS, FONTS} from '../constants';
import {addImage, updateUserRequest} from '../store/userSlice';
import Input from '../components/Form/Input';
import BottomModal from '../components/Modal/BottomModal';
import CustomButton from '../components/CustomButton';
import Item from '../components/Profile/Item';
import Button from '../components/Form/Button';
import Avatar from '../components/Avatar';

const EditProfileScreen = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const {loading, data} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onHandleModalShow = () => {
    setShow(true);
  };

  const onHandleModalClose = () => {
    setShow(false);
  };

  // useEffect(() => {
  //   if (data) {
  //     showMessage({
  //       message: 'Profile updated successfully',
  //       type: 'success',
  //       icon: 'success',
  //     });
  //   }
  // }, [data]);

  const handleChangeImageFromCamera = async () => {
    await launchCamera(
      {mediaType: 'photo', quality: 1, saveToPhotos: true},
      res => {
        if (res.didCancel) return;
        dispatch(addImage(res.assets[0].uri));
        setImage({
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName,
        });
        onHandleModalClose();
      },
    );
  };

  const handleChangeImageFromGallery = async () => {
    await launchImageLibrary({}, res => {
      if (res.didCancel) return;
      dispatch(addImage(res.assets[0].uri));
      setImage({
        uri: res.assets[0].uri,
        type: res.assets[0].type,
        name: res.assets[0].fileName,
      });
      onHandleModalClose();
    });
  };

  const onHandleUpdateSubmit = async values => {
    const formData = new FormData();
    if (image) {
      formData.append('profile', {
        name: new Date() + '_profile',
        uri: image.uri,
        type: image.type,
      });
    }
    formData.append('firstName', values.firstName.toString());
    formData.append('lastName', values.lastName.toString());
    formData.append('username', values.username.toString());
    dispatch(updateUserRequest(formData, 'deneme'));
    showMessage({
      message: 'Profile updated successfully',
      type: 'success',
      icon: 'success',
    });
  };

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    },
    onSubmit: values => {
      onHandleUpdateSubmit(values);
    },
  });

  return (
    <Container>
      <HandleAvatar onPress={onHandleModalShow}>
        <Content>
          <Avatar width={90} height={90} />
          <Text>Change Profile Image</Text>
        </Content>
      </HandleAvatar>
      <Input
        value={values.firstName}
        onChangeText={handleChange('firstName')}
        label="First Name"
      />
      <Input
        value={values.lastName}
        label="Last Name"
        onChangeText={handleChange('lastName')}
      />
      <Input
        value={values.username}
        label="Username"
        onChangeText={handleChange('username')}
      />
      <Button text="Güncelle" onPress={handleSubmit} loading={loading} />
      <BottomModal
        onTouchOutSide={onHandleModalClose}
        title="Change Photo"
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
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const HandleAvatar = styled.TouchableWithoutFeedback``;

const Content = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  margin-top: 10px;
  margin-bottom: 30px;
  color: ${COLORS.primary};
  font-family: ${FONTS.medium};
`;

export default EditProfileScreen;
