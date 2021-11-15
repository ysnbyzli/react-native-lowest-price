import React from 'react';

import styled from 'styled-components';
import {COLORS, FONTS} from '../../constants';

const Title = ({text}) => {
  return (
    <Container>
      <Text>CONTENT</Text>
    </Container>
  );
};

const Container = styled.View`
  background-color: #c4c4c4;
  padding: 10px;
`;
const Text = styled.Text`
  font-family: ${FONTS.bold};
  color: #eceaea;
  letter-spacing: 1px;
`;

export default Title;
