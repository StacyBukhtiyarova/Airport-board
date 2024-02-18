import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useSelector } from 'react-redux';
import { flightsSelector } from '../selector.js';
import { printArrivals, printDepartures, printFlights } from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export const SearchForm = ({ flights }) => {
  // state for the list of flights to show
  console.log(flights);
  const handleClick = (event) => {
    // add event as a parameter
    event.preventDefault();
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
          className="search-line-container"></input>
        <button
          className="search-line-container search-button"
          type="submit"
          onClick={handleClick}>
          Знайти
        </button>
      </div>
      <FlightButtons />
      {
        // only render the list if there are flights
        <ul style={{ color: 'red' }}>
          {flights.map(
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
  // определяем функцию mapState
  return {
    flights: flightsSelector(state), // возвращаем объект с нужными свойствами из state
  };
};
const mapDispatch = {
  printFlights,
};
export default connect(mapState, mapDispatch)(SearchForm);
