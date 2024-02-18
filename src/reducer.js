import { PRINT_DEPARTURES, PRINT_ARRIVALS, PRINT_FLIGHTS } from './actions.js';
import fetchRequest from './serverRequests.js';
const departures = await fetchRequest().then((data) =>
  data.map(({ departureCity }) => departureCity)
);
const arrivals = await fetchRequest().then((data) =>
  data.map(({ arrivalCity }) => arrivalCity)
);
const flights = await fetchRequest().then((data) => data);

const flightsReducer = (state = flights, action) => {
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