import React from 'react';
import styled from 'styled-components';
import {useFormik} from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {images, SIZES, COLORS, FONTS} from '../constants';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import {loginSchema} from '../validations';

const LoginScreen = ({navigation}) => {
  const {handleSubmit, handleBlur, handleChange, values, errors, touched} =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <Container>
      <Background source={images.bg} resizeMode="cover">
        <Content>
          <Input
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            error={errors.username}
            touched={touched.username}
            onBlur={handleBlur('username')}
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
          <Button text={'Sign in'} onPress={handleSubmit} />
          <SignUpText>
            Don’t You have an account? <BoldText>Sign up</BoldText>
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
  font-weight: bold;
  color: ${COLORS.white};
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
export default LoginScreen;
