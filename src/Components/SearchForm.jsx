import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
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
  // const [filteredFlights, setFilteredFlights] = useState([]);
  // state for the list of flights to show

  const handleClick = (event) => {
    // add event as a parameter
    event.preventDefault();
    return dispatch(printFlights);
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
          onClick={printFlights}>
          Знайти
        </button>
      </div>
      <FlightButtons />

      {
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
  console.log(state);
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
