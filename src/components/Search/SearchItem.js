import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {COLORS, FONTS} from '../../constants';

const SearchItem = () => {
  return (
    <Container>
      <Icon name="search" size={16} color={COLORS.gray} />
      <Text>Fake Result 4</Text>
    </Container>
  );
};

const Container = styled.View`
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
