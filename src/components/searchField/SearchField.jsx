import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './searchField.scss';
const SearchField = ({ input, onClickFlights, onClickSearchFlight }) => {
  return (
    <div>
      <div className="search-line-container">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
        />
        <input
          type="text"
          placeholder="Номер рейсу або місто"
          className="text-field"
          value={input}
          onChange={onClickSearchFlight}></input>
        <button
          className="search-line-container search-button"
          type="submit"
          onClick={onClickFlights}>
          Знайти
        </button>
      </div>
    </div>
  );
};
export default SearchField;

SearchField.propTypes = {
  input: PropTypes.string,
  onClickFlights: PropTypes.func,
  onClickSearchFlight: PropTypes.func,
};
