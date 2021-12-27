import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images} from '../constants';
import Avatar from './Avatar';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, logout} from '../store/userSlice';

const CustomDrawer = props => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => props.navigation.navigate('LoginScreen'));
  };

  return (
    <StyledContainer>
      <DrawerContentScrollView {...props}>
        <StyledImageBg source={images.banner}>
          {user && (
            <AvatarContainer>
              <Avatar />
              <TextBox>
                <Name>
                  {user.firstName} {user.lastName}
                </Name>
                <Username>@{user.username}</Username>
              </TextBox>
            </AvatarContainer>
          )}
        </StyledImageBg>
        <StyledBody>
          <DrawerItemList {...props} />
        </StyledBody>
      </DrawerContentScrollView>
      <BottomContent style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <BottomItem>
          <Ionicons name="settings-outline" size={22} color={'#000'} />
          <BottomText>Settings</BottomText>
        </BottomItem>
        {user ? (
          <StyledTouchable onPress={() => handleLogout()}>
            <BottomItem>
              <Ionicons name="exit-outline" size={22} color={'#000'} />
              <BottomText>Logout</BottomText>
            </BottomItem>
          </StyledTouchable>
        ) : (
          <StyledTouchable
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <BottomItem>
              <Ionicons name="enter-outline" size={22} color={'#000'} />
              <BottomText>Login</BottomText>
            </BottomItem>
          </StyledTouchable>
        )}
      </BottomContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledBody = styled.View`
  flex: 1;
  padding-top: 20px;
`;

const StyledImageBg = styled.ImageBackground`
  justify-content: center;
  height: 153px;
  margin-top: -20px;
`;

const BottomContent = styled.View`
  padding: 20px;
  padding-left: 25px;
`;

const StyledTouchable = styled.TouchableWithoutFeedback``;

const BottomItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const BottomText = styled.Text`
  margin-left: 10px;
  font-family: ${FONTS.bold};
  color: ${COLORS.black};
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  margin-left: 15px;
`;
const TextBox = styled.View`
  margin-left: 15px;
  justify-content: center;
`;
const Name = styled.Text`
  font-family: ${FONTS.bold};
  color: ${COLORS.white};
`;
const Username = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.white};
  font-size: 10px;
  letter-spacing: 0.6px;
`;
export default CustomDrawer;
