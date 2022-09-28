import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Web3Provider from './Web3Provider';
import MaterialThemeProvider from "./theme";

import Index from './pages';

const App = () => {
  return (
    <Provider store={store}>
      <MaterialThemeProvider>
        <Web3Provider>
          <Index />
        </Web3Provider>
      </MaterialThemeProvider>
    </Provider>
  );
}

export default App;