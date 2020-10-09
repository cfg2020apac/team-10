import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

import React from 'react';
import Navigator from './Navigator';

import UserProvider from './util/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
};

export default App;
