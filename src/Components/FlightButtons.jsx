import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { printArrivals, printDepartures, printFlights } from '../actions.js';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchRequest from '.././serverRequests.js';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';

const FlightButtons = ({
  flights,
  setPickedDate,
  pickedDate,
  printFlights,

  searchFlights,
  onClickDate,
}) => {
  const dispatch = useDispatch();
  const [filteredFlights, setFilteredFlights] = useState([]);

  const arrivals = () => {
    // dispatch(searchFlights(pickedDate));
    fetchRequest().then((data) => {
      const filter = data
        .map((flights) => flights)
        .filter(
          (arrivals) =>
            new Date(arrivals.arrivalDate).getDate() ===
              new Date(pickedDate).getDate() &&
            new Date(arrivals.arrivalDate).getMonth() ===
              new Date(pickedDate).getMonth() &&
            new Date(arrivals.arrivalDate).getFullYear() ===
              new Date(pickedDate).getFullYear()
        );
      setFilteredFlights(filter);
      dispatch(printFlights(filter));
    });
  };
  console.log(filteredFlights);

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
          // onClick={departures}
          pickedDate={pickedDate}>
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
          onClick={arrivals}>
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
