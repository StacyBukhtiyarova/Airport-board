import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchRequest from './serverRequests.js';

import { PRINT_DEPARTURES, PRINT_ARRIVALS, PRINT_FLIGHTS } from './actions.js';

const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case PRINT_DEPARTURES:
      return state;
  }
  switch (action.type) {
    case PRINT_FLIGHTS:
      return {
        ...state,
      };
  }
  switch (action.type) {
    case PRINT_ARRIVALS:
      return state;
    default:
      return state;
  }
};
export default flightsReducer;
