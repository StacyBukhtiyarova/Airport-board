import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
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

const FlightsUrl = ({ printFlights }) => {
  const pickedDateUrl = useParams();
  const [flights, setFlights] = useState([]);
  const formattedDate = new Date(date);
  console.log(formattedDate);
  return fetchRequest().then((data) => {
    setFlights(data), dispatch(printFlights(data));
  });
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

export default connect(mapState, mapDispatch)(FlightsUrl);
