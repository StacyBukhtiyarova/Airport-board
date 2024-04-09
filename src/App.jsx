import React from 'react';
import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import RenderFlights from './Components/RenderFlights';
import store from './store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';
import './index.scss';

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: (
//         <section className="main-search">
//           <Header />
//           <SearchForm />
//         </section>
//       ),
//     },
//   ]);
//   return (
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   );
// };
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
