import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import fetchRequest from '.././serverRequests.js';
const SearchField = ({
  modalWindow,
  setModalWindow,
  input,
  setFlights,
  onClickFlights,
  onClickSearchFlight,
}) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faCalendar}
        onClick={() => setModalWindow(!modalWindow)}
        className="calendar__icon"
      />
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
