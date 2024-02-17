export const PRINT_DEPARTURES = 'FLIGHTS/PRINT_DEPARTURES';
export const PRINT_ARRIVALS = 'FLIGHTS/PRINT_ARRIVALS';

export const printDepartures = (departures) => {
  return { type: PRINT_DEPARTURES, payload: departures };
};
export const printArrivals = (arrivals) => {
  return { type: PRINT_ARRIVALS, payload: arrivals };
};