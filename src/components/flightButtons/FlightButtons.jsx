import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { printFlights } from '../../redux/actions';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { flightsSelector, searchFlightsSelector } from '../../redux/selector';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';

import './flightButtons.scss';

const FlightButtons = ({
  filterArrivals,
  filterDepartures,
  setClickArrivals,
  setClickDepartures,
  pickedDate,
  printFlights,
}) => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickArrivals = () => {
    setClickArrivals(true);
    setClickDepartures(false);
    setFilteredFlights(filterArrivals);
    dispatch(printFlights(filterArrivals));

    const searchParams = createSearchParams({
      selectedDate: pickedDate.toLocaleDateString(),
      type: 'arrivals',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
  };

  const onClickDepartures = () => {
    setClickDepartures(true);
    setClickArrivals(false);
    setFilteredFlights(filterDepartures);
    dispatch(printFlights(filterDepartures));

    const searchParams = createSearchParams({
      selectedDate: pickedDate.toLocaleDateString(),
      type: 'departures',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
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
          className="flights__departure-button "
          onClick={onClickDepartures}>
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
          className="flights__arrival-button"
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
  printFlights,
};
export default connect(mapState, mapDispatch)(FlightButtons);
FlightButtons.propTypes = {
  filterArrivals: PropTypes.array,
  filterDepartures: PropTypes.array,
  setClickArrivals: PropTypes.func,
  setClickDepartures: PropTypes.func,
};
