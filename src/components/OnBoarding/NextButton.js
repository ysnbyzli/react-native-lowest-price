import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NextButton = ({percentage, scrollTo}) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumReference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumReference - (circumReference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={{marginBottom: 20}}>
      <Svg width={size} height={size}>
        <G rotation={'-90'} origin={center}>
          <Circle
            stroke={'#E6E7E8'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={'#3f3d56'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumReference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 28,
    top: 28,
    backgroundColor: '#3f3d56',
    borderRadius: 100,
    padding: 20,
  },
});

export default NextButton;
