import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Easing} from 'react-native-reanimated';

import {SIZES} from '../constants';
import SearchItem from './Search/SearchItem';

const {Value, timing} = Animated;

const Header = () => {
  const input = useRef(null);

  const [isFocused, setIsFocuesed] = useState(false);
  const [keyword, setKeyword] = useState('');

  const _input_box_translate_x = new Value(SIZES.width);
  const _back_button_opacity = new Value(0);
  const _content_translate_y = new Value(SIZES.height);
  const _content_opacity = new Value(0);

  const onHandleFocus = () => {
    setIsFocuesed(true);
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true, //
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true, //
    };
    timing(_input_box_translate_x, input_box_translate_x_config).start();
    timing(_back_button_opacity, back_button_opacity_config).start();
    timing(_content_translate_y, content_translate_y_config).start();
    timing(_content_opacity, content_opacity_config).start();
  };
  const onHandleBlur = () => {
    setIsFocuesed(true);
    const input_box_translate_x_config = {
      duration: 200,
      toValue: SIZES.width,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true, //
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true, //
    };
    const content_translate_y_config = {
      duration: 0,
      toValue: SIZES.height,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true, //
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true, //
    };
    timing(_input_box_translate_x, input_box_translate_x_config).start();
    timing(_back_button_opacity, back_button_opacity_config).start();
    timing(_content_translate_y, content_translate_y_config).start();
    timing(_content_opacity, content_opacity_config).start();
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <View>
              <Text>Logo</Text>
            </View>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={onHandleFocus}
              style={styles.search_icon_box}>
              <Ionicons name="search" size={22} color="#000000" />
            </TouchableHighlight>
            <Animated.View
              style={[
                styles.input_box,
                {transform: [{translateX: _input_box_translate_x}]},
              ]}>
              <Animated.View style={{opacity: _back_button_opacity}}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={onHandleBlur}
                  style={styles.back_icon_box}>
                  <Ionicons name="arrow-back" size={22} />
                </TouchableHighlight>
              </Animated.View>
              <TextInput
                ref={input}
                placeholder="Search"
                clearButtonMode="always"
                value={keyword}
                onChangeText={value => setKeyword(value)}
                style={styles.input}
              />
            </Animated.View>
          </View>
        </View>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: _content_opacity,
            transform: [{translateY: _content_translate_y}],
          },
        ]}>
        <View style={styles.content_container}>
          <View style={styles.content_inner}>
            <View style={styles.separator} />
            {keyword === '' ? (
              <View style={styles.image_placeholder_container}>
                <Image
                  source={require('../assets/images/search.png')}
                  style={styles.image_placeholder}
                />
                <Text style={styles.image_placeholder_text}>
                  Enter a few words{'\n'} to search on App
                </Text>
              </View>
            ) : (
              <ScrollView>
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
              </ScrollView>
            )}
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: SIZES.width - 32,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  content: {
    width: SIZES.width,
    height: SIZES.height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  content_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_inner: {
    flex: 1,
    paddingRight: 50,
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb',
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
  },
  image_placeholder: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginLeft: 70,
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginLeft: 50,
    marginTop: 20,
  },
});

export default Header;
