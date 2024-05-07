import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';
import fetchRequest from '../../gateways/serverRequests.js';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';

const UrlParams = ({ printFlights }) => {
  const [flights, setFlights] = useState([]);
  const handleFlightsList = () => {
    return fetchRequest().then((data) => {
      setFlights(data), dispatch(printFlights(data));
    });
  };

  console.log(flights);
  return flights;
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

export default connect(mapState, mapDispatch)(UrlParams);

UrlParams.propTypes = {
  searchFlights: PropTypes.func,
  printArrivals: PropTypes.func,
  printDepartures: PropTypes.func,
  printFlights: PropTypes.func,
};
