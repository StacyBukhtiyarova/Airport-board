import React from 'react';
import Header from './Components/Header';
import {SearchForm} from './Components/SearchForm';
import store from './store';
import { Provider } from 'react-redux';
import './index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <section className="main-search">
        <Header />
        <SearchForm />
      </section>
    </Provider>
  );
};
export default App;