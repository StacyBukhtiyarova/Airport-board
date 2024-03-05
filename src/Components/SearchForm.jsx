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
    <div className="container">
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
      <FlightButtons />

      <section>
        <ul className="flights-list">
          <li className="flights-list__titles">Terminal</li>
          <li className="flights-list__titles">Schedule</li>
          <li className="flights-list__titles">Destination</li>
          <li className="flights-list__titles">Status</li>
          <li className="flights-list__titles">Airline</li>
          <li className="flights-list__titles">Flight</li>
        </ul>
        <ul className="flights-list__display">
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
            }) => {
              const scheduleDateHour = new Date(departureDate).getHours();
              const scheduleDateMinutes = new Date(departureDate).getMinutes();
              const time = new Date(departureDate).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
              });
              // console.log(new Date(departureDate).toLocaleTimeString('en-ru'));
              return (
                <li className="flights-list__item">
                  <span>{terminal}</span>
                  <span className="flights-list__time">{time}</span>
                  <span className="flights-list__departure">
                    {departureCity}
                  </span>
                  <span className="flights-list__status">{status}</span>
                  <span className="flights-list__airline">
                    {airlineName}
                    <img
                      className="flights-list__logo"
                      src={airlineLogo}
                      width="20px"
                      height="20px"
                    />
                  </span>
                  <span className="flights-list__codeshare">{codeShare}</span>
                </li>
              );
            }
          )}
        </ul>
      </section>
    </div>
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
