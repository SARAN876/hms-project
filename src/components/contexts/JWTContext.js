import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
  logIn: () => {},
  logOut: () => {}
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await localStorage.getItem('accessToken');
      if (storedToken) {
        setAuthToken(storedToken);
      }
    };
    fetchToken();

    async function fetchUser() {
      const storedToken = await localStorage.getItem('accessToken');
      if (storedToken) {
        try {
          const user = true;
          if (user) {
            return setUserData(JSON.stringify(user));
          } else {
            return logOut();
          }
        } catch (error) {
          return logOut();
        }
      }
    }
    fetchUser();
  }, []);

  const logIn = async (accessToken) => {
    try {
      const response = accessToken;
      setAuthToken(response);
      await localStorage.setItem('accessToken', response);
      return response;
    } catch (error) {
      console.log('Auth Context signIn: Error ', error);
    }
  };

  const logOut = async () => {
    try {
      setAuthToken(null);
      setUserData(null);
      await localStorage.removeItem('accessToken', null);
    } catch (error) {
      console.log('Auth Context signOut: Error', error);
    }
  };

  const values = {
    user: userData,
    isAuthenticated: authToken,
    logIn,
    logOut
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
