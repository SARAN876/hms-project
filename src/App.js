import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import store from '../src/store';
import Router from './routes';
import { AuthContextProvider } from '../src/components/contexts/JWTContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </AuthContextProvider>
    </>
  );
}

export default App;
