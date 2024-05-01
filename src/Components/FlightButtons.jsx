import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { printFlights } from '../redux/actions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/flightButtons.scss';
const FlightButtons = ({
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
        <Link to="/departures">
          <button
            type="submit"
            className="flights__departure-button"
            onClick={handleDepartures}>
            Виліт
          </button>
        </Link>
      </div>

      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneArrival}
          className="plane-icon__arrival"
        />
        <Link to="/arrivals">
          <button
            type="submit"
            className="flights__arrival-button"
            onClick={onClickArrivals}>
            Приліт
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FlightButtons;
