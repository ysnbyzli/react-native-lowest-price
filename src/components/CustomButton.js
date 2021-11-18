import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomButton = ({text, icon, onPress, color, bg, padding}) => {
  return (
    <Button onPress={onPress}>
      <Content bg={bg} padding={padding}>
        <Text color={color}>{text}</Text>
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={color}
            style={{marginLeft: 10}}
          />
        )}
      </Content>
    </Button>
  );
};

const Button = styled.TouchableWithoutFeedback``;
const Content = styled.View`
  margin-top: 10px;
  background-color: ${props => (props.bg ? props.bg : COLORS.primary)};
  padding: ${props => (props.padding ? props.padding + 'px' : '5px')};
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  color: ${props => (props.color ? props.color : COLORS.white)};
`;

export default CustomButton;
