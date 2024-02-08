import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const SearchForm = () => {
  return (
    <>
      <div className="search-line-container">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='search-icon'
        />
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
