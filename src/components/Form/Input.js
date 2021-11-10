import React, {useState} from 'react';
import styled from 'styled-components/native';
import {FONTS} from '../../constants';

const Input = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  error,
  onBlur,
  touched,
}) => {
  return (
    <Container>
      <InputWrapper error={error} touched={touched}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </InputWrapper>
      {error && touched && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.View``;
const InputWrapper = styled.View`
  background-color: #f1eded;
  width: 100%;
  border-radius: 20px;
  padding-left: 12px;
  margin-top: 18px;
  border: ${props => (props.error && props.touched ? '#ff4f4f' : '#f1eded')};
`;

const TextInput = styled.TextInput``;
const ErrorText = styled.Text`
  font-family: ${FONTS.regular};
  color: #ff4f4f;
  font-size: 13px;
  margin-left: 5px;
  font-style: italic;
`;

export default Input;
