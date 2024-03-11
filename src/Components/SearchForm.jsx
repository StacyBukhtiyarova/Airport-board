import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import CalendarModal from './CalendarModal.jsx';
import RenderFlights from './RenderFlights.jsx';
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
  const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();
  const onClickFlights = (e) => {
    e.preventDefault();
    fetchRequest().then((data) => {
      return setFlights(data), dispatch(printFlights(data));
    });
  };
  const onClickSearchFlight = (e) => {
    setInput(e.target.value);
    dispatch(searchFlights(e.target.value));
  };
  const filteredFlights = flights.filter(({ departureCity }) =>
    departureCity.toLowerCase().match(input.toLowerCase())
  );
  return (
    <div className="container">
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
      {modalWindow === true && (
        <button className="calendar__modal">
          <CalendarModal />
        </button>
      )}
      <FlightButtons />
      <RenderFlights filteredFlights={filteredFlights} />
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
