import { createSelector } from 'reselect';
export const flights = (state) => {
  return state.flights;
};
export const flightsSelector = createSelector(flights, (flights) => flights);

export const searchFlights = (state) => {
  return state;
};
export const searchFlightsSelector = createSelector(
  searchFlights,
  (searchFlights) => searchFlights
);
