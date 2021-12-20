import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {COLORS, SIZES} from '../../constants';

const Paginator = ({data, scrollX}) => {
  const {width} = SIZES;

  return (
    <Container>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            width={10}
            style={[styles.dot, {width: dotWidth, opacity}]}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  height: 64px;
`;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
  },
});

export default Paginator;
