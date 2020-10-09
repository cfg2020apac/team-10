import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = createContext({});

function UserProvider(props) {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(async () => {
    const storageUserId = await AsyncStorage.getItem('userId');
    const storageAuthToken = await AsyncStorage.getItem('authToken');

    setUserId(storageUserId);
    setAuthToken(storageAuthToken);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        authToken,
        setUserId: (userId) => {
          setUserId(userId);
          if (userId) {
            AsyncStorage.setItem('userId', userId);
          } else {
            AsyncStorage.removeItem('userId');
          }
        },
        setAuthToken: (authToken) => {
          setAuthToken(authToken);
          if (authToken) {
            AsyncStorage.setItem('authToken', authToken);
          } else {
            AsyncStorage.removeItem('authToken');
          }
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
