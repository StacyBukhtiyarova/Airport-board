import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch, useSelector } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchForm = ({ flights, printFlights, searchFlights, search }) => {
  const [filteredFlights, setAllFlights] = useState([]);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    fetchRequest().then((data) => {
      return setAllFlights(data), dispatch(printFlights(data));
    });
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
          value={input}
          onChange={(e) => {
            return setInput(e.target.value);
          }}></input>
        <button
          className="search-line-container search-button"
          type="submit"
          onClick={handleClick}>
          Знайти
        </button>
      </div>
      <FlightButtons />

      {
        <ul style={{ color: 'red' }}>
          {filteredFlights.map(
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
      }
    </>
  );
};

const mapState = (state) => {
  return {
    flightsList: flightsSelector(state),
    searchFlights: searchFlightsSelector(state),
  };
};
const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
  searchFlights,
};

export default connect(mapState, mapDispatch)(SearchForm);
