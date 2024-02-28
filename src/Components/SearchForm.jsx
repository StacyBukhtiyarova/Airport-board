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

const SearchForm = ({ printFlights, searchFlights }) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const onClickFlights = (e) => {
    e.preventDefault();
    console.log(input);
    fetchRequest().then((data) => {
      return setFlights(data), dispatch(printFlights(data));
    });
  };
  const onClickSearchFlight = (e) => {
    setInput(e.target.value);
    dispatch(searchFlights(e.target.value));
  };
  // const displayedFlights = filteredFlights.map(
  //   ({ departureCity, arrivalCity }) =>
  //     console.log(input === departureCity)
  // );
  const filteredFlights = flights.filter(({ departureCity, arrivalCity }) => {
    //  const departureFlight = input.toLowerCase() === departureCity.toLowerCase();
    //  const arrivalFlight = input.toLowerCase() === arrivalCity.toLowerCase();
    //   return departureFlight || arrivalFlight;
    const match = departureCity.toLowerCase().match(input.toLowerCase());
    return match;
  });
  console.log(filteredFlights);
  // console.log(input);
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
          onChange={onClickSearchFlight}></input>
        <button
          className="search-line-container search-button"
          type="submit"
          onClick={onClickFlights}>
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
    searchFlight: searchFlightsSelector(state),
  };
};
const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
  searchFlights,
};

export default connect(mapState, mapDispatch)(SearchForm);
