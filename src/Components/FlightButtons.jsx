import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { printArrivals, printDepartures, printFlights } from '../actions.js';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';

const FlightButtons = ({
  printFlights,
  filterArrivals,
  filterDepartures,
  setClickArrivals,
  setClickDepartures,
}) => {
  const dispatch = useDispatch();
  const [filteredFlights, setFilteredFlights] = useState([]);

  const onClickArrivals = () => {
    setFilteredFlights(filterArrivals);
    dispatch(printFlights(filterArrivals));
    setClickArrivals(true);
    setClickDepartures(false);
  };
  const handleDepartures = () => {
    setFilteredFlights(filterDepartures);
    dispatch(printFlights(filterDepartures));
    setClickDepartures(true);
    setClickArrivals(false);
  };

  return (
    <div className="flights">
      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          className="plane-icon__departure"
        />
        <button
          type="submit"
          className=" flights__departure-button"
          onClick={handleDepartures}
          setClickDepartures={setClickDepartures}>
          Виліт
        </button>
      </div>
      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneArrival}
          className="plane-icon__arrival"
        />
        <button
          type="submit"
          className=" flights__arrival-button"
          setClickArrivals={setClickArrivals}
          onClick={onClickArrivals}>
          Приліт
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    arrivals: searchFlightsSelector(state),
    departures: searchFlightsSelector(state),
    flights: flightsSelector(state),
  };
};
const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
};

export default connect(mapState, mapDispatch)(FlightButtons);
