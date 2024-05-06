import React from 'react';
import { useState } from 'react';
import Header from './components/header/Header';
import SearchForm from './components/searchForm/SearchForm';
import store from './store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';
import './index.scss';

const routes = [
  {
    path: '/',
    element: (
      <section className="main-search">
        <Header />
        <SearchForm />
      </section>
    ),
  },
  {
    path: 'departures',
    element: (
      <section className="main-search">
        <Header />
        <SearchForm />
      </section>
    ),
  },
  {
    path: '/arrivals',
    element: (
      <section className="main-search">
        <Header />
        <SearchForm />
      </section>
    ),
  },
];

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
        </Routes>
      </RouterProvider>
    </Provider>
  );
};

export default App;
