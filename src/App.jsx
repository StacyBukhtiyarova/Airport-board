import React from 'react';
import { useState } from 'react';
import Header from './components/header/Header';
import SearchForm from './components/searchForm/SearchForm';
import store from './store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <section className="main-search">
                <Header />
                <SearchForm />
              </section>
            }></Route>
          <Route
            path="/arrivals/:selectedDate"
            element={
              <section className="main-search">
                <Header />
                <SearchForm />
              </section>
            }></Route>
          <Route
            path="/departures/:selectedDate"
            element={
              <section className="main-search">
                <Header />
                <SearchForm />
              </section>
            }></Route>
          <Route
            path="/:pickedDate"
            element={
              <section className="main-search">
                <Header />
                <SearchForm />
              </section>
            }></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
