import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/Home';
import {COLORS, FONTS} from '../constants';
import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import BarcodeScanner from '../screens/BarcodeScanner';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const user = useSelector(selectUser);

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
        component={HomeStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      {user && (
        <Drawer.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="Barcode"
        component={BarcodeScanner}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="barcode" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
