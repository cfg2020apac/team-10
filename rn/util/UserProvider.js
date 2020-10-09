import React, { useState, useEffect, createContext } from 'react';

export const UserContext = createContext({});

function UserProvider(props) {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // todo
  }, []);

  return (
    <UserContext.Provider
      value={{ userId, authToken, setUserId, setAuthToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
