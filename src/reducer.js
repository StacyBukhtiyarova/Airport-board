import {
    printDepartures,
    printArrivals,
    PRINT_DEPARTURES,
    PRINT_ARRIVALS,
  } from './actions.js';
  const initialState = { flights: { departures: [1], arrivals: [1] } };
  const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
      case PRINT_DEPARTURES:
        return { ...state };
    }
    switch (action.type) {
      case PRINT_ARRIVALS:
        return { ...state};
      default:
        return state;
    }
  };
  export default flightsReducer;