import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CustomStackNav from './navigation/CustomStackNav';

const App = () => {
  return (
    <NavigationContainer>
      <CustomStackNav />
    </NavigationContainer>
  );
};

export default App;
