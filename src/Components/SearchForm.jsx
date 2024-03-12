import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import CalendarModal from './CalendarModal.jsx';
import RenderFlights from './RenderFlights.jsx';
import FlightsTitles from './FlightsTitles.jsx';
import SearchField from './SearchField.jsx';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
const SearchForm = ({
  printFlights,
  searchFlights,
  pickedDate,
  setPickedDate,
}) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();

  const filterFlightsSearchForm = flights.filter(({ departureCity }) =>
    departureCity.toLowerCase().match(input.toLowerCase())
  );
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
  return (
    <div className="container">
      <SearchField
        modalWindow={modalWindow}
        setModalWindow={setModalWindow}
        flights={flights}
        setFlights={setFlights}
        onClickFlights={onClickFlights}
        onClickSearchFlight={onClickSearchFlight}
      />
      <FlightButtons />
      <FlightsTitles />
      {modalWindow === true && (
        <CalendarModal
          modalWindow={modalWindow}
          setModalWindow={setModalWindow}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
        />
      )}

      <RenderFlights filterFlightsSearchForm={filterFlightsSearchForm} />
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
