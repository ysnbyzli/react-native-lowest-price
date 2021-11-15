import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import {FONTS, COLORS} from '../constants';
import Title from '../components/Profile/Title';
import Item from '../components/Profile/Item';
import CustomButton from '../components/CustomButton';

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <Container>
      <Header>
        <Avatar
          source={require('../assets/images/avatar.png')}
          resizeMode="cover"
        />
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
          onPress={() => console.log('Edit click')}
        />
      </Header>
      <Body>
        <Title />
        <Item
          title="Favorites"
          icon="heart-outline"
          onPress={() => console.log('Favorite click')}
        />
        <Item
          title="Products"
          icon="layers-outline"
          onPress={() => console.log('Product click')}
        />
      </Body>
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

const Avatar = styled.Image`
  height: 100px;
  width: 100px;
`;

const Body = styled.View`
  margin-top: 20px;
`;
export default Profile;
