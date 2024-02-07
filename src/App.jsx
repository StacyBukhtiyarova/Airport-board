import React from 'react';
import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import '../index.scss';
const App = () => {
  return (
    <section className="main-search">
      <Header />
      <SearchForm />
    </section>
  );
};
export default App;
