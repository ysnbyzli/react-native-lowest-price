import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {COLORS, FONTS} from '../../constants';

const SearchItem = ({product, onPress}) => {
  return (
    <Container onPress={onPress}>
      <Content>
        <Icon name="search" size={16} color={COLORS.gray} />
        <Text>{product.title}</Text>
      </Content>
    </Container>
  );
};

const Container = styled.TouchableWithoutFeedback``;

const Content = styled.View`
  flex-direction: row;
  height: 40px;
  align-items: center;
  margin-left: 16px;
`;

const Icon = styled(Ionicons)`
  margin-left: 15px;
  margin-right: 20px;
`;

const Text = styled.Text`
  font-family: ${FONTS.medium};
`;

export default SearchItem;
