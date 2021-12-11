import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import {FONTS, COLORS} from '../constants';
import Title from '../components/Profile/Title';
import Item from '../components/Profile/Item';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';

const Profile = ({navigation}) => {
  const user = useSelector(selectUser);

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

const Body = styled.View`
  margin-top: 20px;
`;
export default Profile;
