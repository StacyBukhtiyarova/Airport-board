import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { printArrivals, printDepartures, printFlights } from '../actions.js';
import { flightsSelector } from '../selector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';

const FlightButtons = ({ flights, printFlights }) => {
  //console.log(flights);

  const [filteredFlights, setfilteredFlights] = useState([]);
  const onClickArrivals = (e) => {
    e.preventDefault();
    const filteredFlights = flights.match();
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
          className=" flights__departure-button">
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
          className=" flights__arrival-button">
          Приліт
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    //  arrivals: arrivalsSelector(state),
    // departures: departuresSelector(state),
    flights: flightsSelector(state),
  };
};
const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
};

export default connect(mapState, mapDispatch)(FlightButtons);
