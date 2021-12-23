import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppStack from './AppStack';
import AddProductScreen from '../screens/AddProductScreen';
import ProductScreen from '../screens/ProductScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import UserProductScreen from '../screens/UserProductScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  const user = useSelector(state => state.user.data);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user && (
        <>
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
      <Stack.Screen name="Root" component={AppStack} />
      {user && (
        <>
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
          />
        </>
      )}

      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="UserProductScreen" component={UserProductScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
