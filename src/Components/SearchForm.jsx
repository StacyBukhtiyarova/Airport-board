import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector } from '../selector.js';
import { printArrivals, printDepartures, printFlights } from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import fetchRequest from '../serverRequests.js';

const fetchedFlights = await fetchRequest();
const SearchForm = ({ flights, printFlights }) => {
  const [searchFormValue, setSearchFormValue] = useState('');
  const [allFlights, setAllFlights] = useState([]);
  const dispatch = useDispatch();

  const handleSearchClick = (event) => {
    event.preventDefault();
    setAllFlights(fetchedFlights);
    dispatch(printFlights(fetchedFlights));
  };

  return (
    <>
      <div className="search-line-container">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
        />
        <input
          type="text"
          placeholder="Номер рейсу або місто"
          className="search-line-container"
          value={searchFormValue}
          onChange={(event) => setSearchFormValue(event.target.value)}></input>

        <button
          className="search-line-container search-button"
          type="submit"
          onClick={handleSearchClick}>
          Знайти
        </button>
      </div>
      <FlightButtons />

      <ul style={{ color: 'red' }}>
        {allFlights.map(
          ({
            terminal,
            departureCity,
            arrivalCity,
            type,
            departureDate,
            arrivalDate,
            departureDateExpected,
            arrivalDateExpected,
            status,
            airlineName,
            airlineLogo,
            id,
            codeShare,
          }) => (
            <li>
              <span>{terminal}</span>

              <span>{departureCity}</span>

              <span>{arrivalCity}</span>

              <span>{type}</span>

              <span>{departureDate}</span>

              <span>{arrivalDate}</span>
              <span>{departureDateExpected}</span>
              <span>{arrivalDateExpected}</span>
            </li>
          )
        )}
      </ul>
    </>
  );
};

const mapState = (state) => {
  return {
    flights: flightsSelector(state),
    searchField: state,
  };
};
const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
};

export default connect(mapState, mapDispatch)(SearchForm);
