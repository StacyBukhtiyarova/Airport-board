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
  filterDepartures,
  filterArrivals,
  searchFlights,
  onClickDate,
  clickArrivals,
  setClickArrivals,
}) => {
  const dispatch = useDispatch();
  const [filteredFlights, setFilteredFlights] = useState([]);

  const onClickArrivals = () => {
    // dispatch(searchFlights(pickedDate));
    // fetchRequest().then((data) => {
    //   const flights = data.map((flight) => flight);
    //   setFilteredFlights(flights);
    //   dispatch(printFlights(flights));
    // });
    // setClickArrivals(!clickArrivals);
    // if (clickArrivals) {
    //   return filterArrivals;
    // } else {
    //   filterDepartures;
    // }
    setFilteredFlights(filterArrivals);
    dispatch(printFlights(filterArrivals));
    setClickArrivals(true);
    // console.log(filterArrivals,filterDepartures)
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

          // onClick={departures}
          //  pickedDate={pickedDate}
        >
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
