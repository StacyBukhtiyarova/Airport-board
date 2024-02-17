import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useSelector } from 'react-redux';
import { flightsSelector } from '../selector.js';
import { printArrivals, printDepartures } from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const SearchForm = () => {
  const flights = useSelector(flightsSelector);
  const [filteredFlights, setFilteredFlights] = useState([]); // state for the list of flights to show
  const handleDepartures = () => {
    const filterDepartures = flights.filter(
      (departures) => departures === data.departures
    );
    console.log(departures);
  };
  const handleClick = (event) => {
    // add event as a parameter
    event.preventDefault();
    console.log(flights);
    setFilteredFlights(flights);
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
      {filteredFlights.length > 0 && ( // only render the list if there are flights
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
      )}
    </>
  );
};

//};

const mapDispatch = () => ({
  printDepartures: printDepartures,
  printArrivals: printArrivals,
});

export default connect(mapDispatch)(SearchForm);
