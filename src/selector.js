import { createSelector } from 'reselect';
export const flights = (state) => {
  return state;
};
export const flightsSelector = createSelector([flights], (flights) => flights);

export const arrivals = (state) => {
  return state;
};
export const arrivalsSelector = createSelector([flights], (flights) => flights);

export const departures = (state) => {
  return state.flights;
};
export const departuresSelector = createSelector(
  [flights],
  (flights) => flights
);
