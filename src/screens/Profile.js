import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
import {selectUser, logout} from '../store/userSlice';
import {FONTS, COLORS} from '../constants';
import Title from '../components/Profile/Title';
import Item from '../components/Profile/Item';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import api from '../utils/api';
import CustomModal from '../components/Modal/CustomModal';
import Button from '../components/Form/Button';
const Profile = ({navigation}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  const handleDeleteMyAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api().delete('/users', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) navigation.navigate('LoginScreen');
  }, [user]);

  return (
    <Container>
      <Header>
        <Avatar width={100} height={100} />
        <Text
          style={{
            marginTop: 10,
            color: COLORS.black,
            fontSize: 18,
            fontFamily: FONTS.regular,
          }}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={{color: COLORS.gray, fontFamily: FONTS.medium}}>
          @{user.username}
        </Text>
        <CustomButton
          text="Edit Profile"
          icon="chevron-forward-outline"
          color={COLORS.white}
          onPress={() => navigation.navigate('EditProfileScreen')}
        />
      </Header>
      <Body>
        <Title />
        <Item
          title="Favorites"
          icon="heart-outline"
          onPress={() => navigation.navigate('FavoritesScreen')}
        />
        <Item
          title="Change Password"
          icon="key-outline"
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        />
        <Item
          title="Products"
          icon="layers-outline"
          onPress={() => navigation.navigate('UserProductScreen')}
        />
        <Item
          title="Delete My Account"
          icon="person-remove-outline"
          onPress={() => setIsShow(true)}
          textStyle={{color: COLORS.danger}}
        />
      </Body>
      <CustomModal modalVisible={isShow}>
        <Text style={{fontFamily: FONTS.regular, color: COLORS.black}}>
          Do you confirm deleting your account?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableWithoutFeedback onPress={() => handleDeleteMyAccount()}>
            <View
              style={{
                backgroundColor: COLORS.danger,
                paddingHorizontal: 20,
                paddingVertical: 3,
                borderRadius: 10,
              }}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.regular}}>
                Ok
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Text
            onPress={() => setIsShow(false)}
            style={{fontFamily: FONTS.regular, color: COLORS.gray}}>
            Cancel
          </Text>
        </View>
      </CustomModal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  align-items: center;
  padding: 20px;
`;

const Body = styled.View`
  margin-top: 20px;
  flex: 1;
`;
export default Profile;
