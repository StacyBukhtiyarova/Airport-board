import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector } from '../selector.js';
import {
  PRINT_FLIGHTS,
  printArrivals,
  printDepartures,
  printFlights,
} from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchForm = ({ flights, printFlights }) => {
  const dispatch = useDispatch();
  const [displayedFlights, setDisplayedFlights] = useState([]);

  const handleSearchClick = () => {
    // Здесь должен быть ваш код для получения данных поиска, например, из поля ввода
    console.log(dispatch(printFlights(flights)));
    setDisplayedFlights(flights);
    return dispatch(printFlights(printFlights));
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
          onClick={handleSearchClick}>
          Знайти
        </button>
      </div>
      <FlightButtons />
      {handleSearchClick && (
        <ul style={{ color: 'red' }}>
          {displayedFlights.map(
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
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    flights: flightsSelector(state),
  };
};
const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
};

export default connect(mapState, mapDispatch)(SearchForm);
