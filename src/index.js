import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
// import { AuthContext } from './components/contexts/JWTContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthContext> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </AuthContext> */}
  </React.StrictMode>
);

reportWebVitals();
