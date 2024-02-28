import {
  PRINT_DEPARTURES,
  PRINT_ARRIVALS,
  PRINT_FLIGHTS,
  SEARCH_FLIGHTS,
} from './actions.js';

import fetchRequest from './serverRequests.js';
const departures = fetchRequest().then((data) =>
  data.map(({ departureCity }) => departureCity)
);
const arrivals = fetchRequest().then((data) =>
  data.map(({ arrivalCity }) => arrivalCity)
);

export const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case PRINT_DEPARTURES:
      return { ...state, flightsList: action.payload };
  }
  switch (action.type) {
    case PRINT_FLIGHTS:
      return { ...state, flightsList: action.payload };
  }
  switch (action.type) {
    case PRINT_ARRIVALS:
      return state;
    default:
      return state;
  }
};
export const searchFlightsReducer = (state = '', action) => {
  switch (action.type) {
    case SEARCH_FLIGHTS:
      return state;
    default:
      return state;
  }
};
