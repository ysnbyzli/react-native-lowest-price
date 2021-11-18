import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {COLORS, FONTS} from '../constants';
import {selectUser} from '../store/userSlice';
import CustomAvatar from './CustomAvatar';

const Avatar = ({width, height}) => {
  const user = useSelector(selectUser);

  return (
    <>
      {user.profile_image ? (
        <Image
          source={{uri: user.profile_image}}
          resizeMode="cover"
          width={width}
          height={height}
        />
      ) : (
        <CustomAvatar />
      )}
    </>
  );
};

const Image = styled.Image`
  height: ${props => (props.height ? props.height + 'px' : '70px')};
  width: ${props => (props.width ? props.width + 'px' : '70px')};
  border-radius: 50px;
`;

export default Avatar;
