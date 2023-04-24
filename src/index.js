import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import UserFront from '@userfront/react';
import { Provider } from 'react-redux';
import store from './redux/store';

UserFront.init('6nz8yppn');

export const UserContext = createContext({});

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContext.Provider value={UserFront}>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContext.Provider>
  </BrowserRouter>,
);
