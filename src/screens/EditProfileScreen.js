import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useFormik} from 'formik';
import {showMessage} from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS, FONTS} from '../constants';
import {
  addImage,
  setError,
  setIsSuccess,
  updateUserRequest,
} from '../store/userSlice';
import Input from '../components/Form/Input';
import BottomModal from '../components/Modal/BottomModal';
import CustomButton from '../components/CustomButton';
import Item from '../components/Profile/Item';
import Button from '../components/Form/Button';
import Avatar from '../components/Avatar';
import {PermissionsAndroid} from 'react-native';

const EditProfileScreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const {loading, data, error, isSuccess} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onHandleModalShow();
      }
    } catch (error) {}
  };

  const onHandleModalShow = () => {
    setShow(true);
  };

  const onHandleModalClose = () => {
    setShow(false);
  };

  const handleChangeImageFromCamera = async () => {
    await launchCamera({mediaType: 'photo', quality: 1}, res => {
      if (res.didCancel) return;
      if (res.assets) dispatch(addImage(res.assets[0]?.uri));
      setImage({
        uri: res.assets[0]?.uri,
        type: res.assets[0]?.type,
        name: res.assets[0]?.fileName,
      });
      onHandleModalClose();
    });
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
    dispatch(updateUserRequest(formData));
  };

  useEffect(() => {
    if (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.message,
      });
      dispatch(setError(null));
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'Your profile has been successfully updated',
      });
      dispatch(setIsSuccess(false));
    }
  }, [isSuccess]);

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
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <Wrapper>
        <HandleAvatar onPress={requestCameraPermission}>
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
      </Wrapper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin: 20px;
`;

const Header = styled.View`
  height: 100px;
`;

const Wrapper = styled.View`
  flex: 1;
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
