import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useFormik} from 'formik';

import {COLORS, FONTS} from '../constants';
import {addImage, selectUser} from '../store/userSlice';
import Input from '../components/Form/Input';
import BottomModal from '../components/Modal/BottomModal';
import CustomButton from '../components/CustomButton';
import Item from '../components/Profile/Item';
import Button from '../components/Form/Button';
import Avatar from '../components/Avatar';

const EditProfileScreen = () => {
  const [show, setShow] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onHandleModalShow = () => {
    setShow(true);
  };

  const onHandleModalClose = () => {
    setShow(false);
  };

  const handleChangeImageFromCamera = async () => {
    await launchCamera(
      {mediaType: 'photo', quality: 1, saveToPhotos: true},
      res => {
        if (res.didCancel) return;
        dispatch(addImage(res.assets[0].uri));
      },
    );
  };

  const handleChangeImageFromGallery = async () => {
    await launchImageLibrary({}, res => {
      if (res.didCancel) return;
      dispatch(addImage(res.assets[0].uri));
    });
  };

  const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
    onSubmit: values => {
      console.log({...values, profile_image: user.profile_image});
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
      <Button text="Güncelle" onPress={handleSubmit} />
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
