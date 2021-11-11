import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {COLORS, FONTS} from '../constants';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -25, fontFamily: FONTS.medium},
        drawerItemStyle: {borderRadius: 20, paddingLeft: 10},
        drawerActiveTintColor: COLORS.white,
        drawerActiveBackgroundColor: COLORS.active,
        drawerInactiveBackgroundColor: COLORS.in_active,
        drawerInactiveTintColor: COLORS.black,
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
