import React, {useState} from 'react';
import {useFormik} from 'formik';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, images, SIZES} from '../constants';
import {registerSchema} from '../validations';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import api from '../utils/api';
import Alert from '../components/Alert';

const RegisterScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async form => {
    try {
      setLoading(true);
      await api().post('/users', form);
      setLoading(false);
      navigation.navigate('LoginScreen', {newUser: true});
    } catch (er) {
      console.log(er);
      setError(er.response.data);
      setLoading(false);
    }
  };

  const {handleSubmit, handleBlur, handleChange, values, errors, touched} =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
      },
      validationSchema: registerSchema,
      onSubmit: values => {
        handleRegister(values);
      },
    });
  return (
    <Container>
      <Background source={images.bg} resizeMode="cover">
        <Content>
          {error && <Alert type="danger" text={error?.message} />}
          <Input
            placeholder="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            error={errors.firstName}
            touched={touched.firstName}
            onBlur={handleBlur('firstName')}
          />
          <Input
            placeholder="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            error={errors.lastName}
            touched={touched.lastName}
            onBlur={handleBlur('lastName')}
          />
          <Input
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            error={errors.username}
            touched={touched.username}
            onBlur={handleBlur('username')}
          />
          <Input
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            error={errors.email}
            touched={touched.email}
            onBlur={handleBlur('email')}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            error={errors.password}
            touched={touched.password}
            onBlur={handleBlur('password')}
          />
          <Button text={'Sign Up'} onPress={handleSubmit} loading={loading} />
          <SignUpText>
            Do you already have an account?{' '}
            <BoldText onPress={() => navigation.navigate('LoginScreen')}>
              Sign in
            </BoldText>
          </SignUpText>
          <BackHomeTouchable
            onPress={() => navigation.navigate('Root', {screen: 'Home'})}>
            <BackHome>
              <Ionicons name="arrow-back" size={22} color={COLORS.white} />
              <Text>Back to home</Text>
            </BackHome>
          </BackHomeTouchable>
        </Content>
      </Background>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
const Background = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  justify-content: center;
  width: ${SIZES.width * 0.8 + 'px'};
`;

const SignUpText = styled.Text`
  text-align: center;
  margin-top: 12px;
  font-family: ${FONTS.regular};
  color: black;
  color: ${COLORS.white};
`;

const BoldText = styled.Text`
  color: ${COLORS.white};
  font-family: ${FONTS.bold};
`;

const BackHomeTouchable = styled.TouchableWithoutFeedback``;

const BackHome = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Text = styled.Text`
  color: ${COLORS.white};
  margin-left: 10px;
  font-family: ${FONTS.bold};
`;

export default RegisterScreen;
