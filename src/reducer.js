import { PRINT_DEPARTURES, PRINT_ARRIVALS } from './actions.js';
import fetchRequest from './serverRequests.js';
const departures = fetchRequest().then((data) =>
  data.map(({ departureCity }) => departureCity)
);
const arrivals = fetchRequest().then((data) =>
  data.map(({ arrivalCity }) => arrivalCity)
);
const flights = fetchRequest().then((data) => data.json());
const initialState = 1;
const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRINT_DEPARTURES:
      return state;
  }
  switch (action.type) {
    case PRINT_ARRIVALS:
      return state;
    default:
      return state;
  }
};
export default flightsReducer;
