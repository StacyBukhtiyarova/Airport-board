import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(coffee);
const SearchForm = () => {
  return (
    <>
      <div className="search-line-container">
        <FontAwesomeIcon icon="coffee" />

        <input
          type="text"
          placeholder="Номер рейсу або місто"
          className="search-line-container"></input>
        <button
          className="search-button"
          type="submit">
          Знайти
        </button>
      </div>
    </>
  );
};

export default SearchForm;
