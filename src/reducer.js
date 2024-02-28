import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchRequest from './serverRequests.js';

import {
  PRINT_DEPARTURES,
  PRINT_ARRIVALS,
  PRINT_FLIGHTS,
  SEARCH_FIELD,
} from './actions.js';

const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case PRINT_DEPARTURES:
      return state;
  }
  switch (action.type) {
    case PRINT_FLIGHTS:
      return {
        ...state,
        flights: action.payload.flights.flightsList,
      };
  }
  switch (action.type) {
    case PRINT_ARRIVALS:
      return state;
  }
  switch (action.type) {
    case SEARCH_FIELD:
      return { ...state, searchField: action.payload.filteredSearch.search };
    default:
      return state;
  }
};
export default flightsReducer;
