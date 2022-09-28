import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Web3Provider from './Web3Provider';

import Index from './pages';

const App = () => {
  return (
    <Provider store={store}>
      <Web3Provider>
        <Index />
      </Web3Provider>
    </Provider>
  );
}

export default App;