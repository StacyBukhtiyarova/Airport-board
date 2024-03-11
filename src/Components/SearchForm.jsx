import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import CalendarModal from './CalendarModal.jsx';
import RenderFlights from './RenderFlights.jsx';
import SearchField from './SearchField.jsx';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
const SearchForm = ({ printFlights, searchFlights }) => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();
  console.log(pickedDate);
  const filteredFlights = flights.filter(({ departureCity }) =>
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
        // onClickSearchFlight={onClickSearchFlight}
      />
      {modalWindow === true && (
        <button className="calendar__modal">
          <CalendarModal
            pickedDate={pickedDate}
            setPickedDate={setPickedDate}
          />
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
