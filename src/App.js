import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AuthStack from './navigation/AuthNavigator';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Auth" component={AuthStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
