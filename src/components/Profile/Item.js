import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {COLORS, FONTS} from '../../constants';

const Item = ({title, icon, onPress}) => {
  return (
    <Button onPress={onPress}>
      <Container>
        <Left>
          <Icon name={icon} size={22} color={COLORS.black} />
          <Text>{title}</Text>
        </Left>
        <Icon name="chevron-forward-outline" size={22} color={COLORS.black} />
      </Container>
    </Button>
  );
};

const Button = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  color: ${COLORS.black};
  font-family: ${FONTS.medium};
  margin-left: 15px;
`;

const Icon = styled(Ionicons)``;

export default Item;
