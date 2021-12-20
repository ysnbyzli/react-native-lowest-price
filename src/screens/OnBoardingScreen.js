import React, {useRef} from 'react';
import {useState} from 'react';
import {FlatList, Animated, View, Text} from 'react-native';
import styled from 'styled-components/native';

import OnBoardingItem from '../components/OnBoarding/OnBoardingItem';
import Paginator from '../components/OnBoarding/Paginator';
import NextButton from '../components/OnBoarding/NextButton';

import {slides} from '../constants';

const OnBoardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}) => {
    return <OnBoardingItem item={item} />;
  };

  const renderKey = item => item.id;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Root', {screen: 'Home'});
    }
  };

  return (
    <Container>
      <Text
        style={{
          position: 'absolute',
          right: 20,
          top: 15,
          zIndex: 9999,
        }}
        onPress={() => navigation.navigate('Root', {screen: 'Home'})}>
        Skip
      </Text>
      <View style={{flex: 3}}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={renderKey}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default OnBoardingScreen;
