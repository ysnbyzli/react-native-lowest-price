import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useFormik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../constants';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import {changePasswordSchema} from '../validations';
import api from '../utils/api';
import {showMessage} from 'react-native-flash-message';

const ChangePasswordScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitForm = async data => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      await api().patch(
        '/users/change-password',
        {password: data.password},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLoading(false);
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'updated for your password',
      });
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error.message,
      });
      setError(null);
    }
  }, [error]);

  const {handleSubmit, handleBlur, handleChange, errors, values, touched} =
    useFormik({
      initialValues: {
        password: '',
        passwordRepeat: '',
      },
      validationSchema: changePasswordSchema,
      onSubmit: value => handleSubmitForm(value),
    });

  return (
    <Container>
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          color={COLORS.black}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <Content>
        <Image source={require('../assets/images/forgot_password.png')} />
        <Input
          placeholder="Password"
          value={values.password}
          onChangeText={handleChange('password')}
          error={errors.password}
          touched={touched.password}
          onBlur={handleBlur('password')}
          secureTextEntry
        />
        <Input
          placeholder="Password Repeat"
          secureTextEntry
          value={values.passwordRepeat}
          onChangeText={handleChange('passwordRepeat')}
          error={errors.passwordRepeat}
          touched={touched.passwordRepeat}
          onBlur={handleBlur('passwordRepeat')}
        />
        <Button
          text={'Change Password'}
          onPress={handleSubmit}
          loading={loading}
        />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  padding: 20px;
`;

const Content = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;

const Image = styled.Image`
  width: 250px;
  height: 200px;
`;

export default ChangePasswordScreen;
