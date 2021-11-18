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
  label,
}) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
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

const Container = styled.View`
  width: 100%;
`;
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

const Label = styled.Text`
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: -6px;
  font-family: ${FONTS.medium};
`;

export default Input;
