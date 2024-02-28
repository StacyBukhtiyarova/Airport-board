export const PRINT_DEPARTURES = 'FLIGHTS/PRINT_DEPARTURES';
export const PRINT_ARRIVALS = 'FLIGHTS/PRINT_ARRIVALS';
export const PRINT_FLIGHTS = 'FLIGHTS';
export const SEARCH_FIELD = 'SEARCH_FIELD';

export const printDepartures = () => {
  return { type: PRINT_DEPARTURES };
};
export const printArrivals = () => {
  return { type: PRINT_ARRIVALS };
};
export const printFlights = (allFlights) => {
  return {
    type: PRINT_FLIGHTS,
    payload: { flights: { flightsList: allFlights } },
  };
};
export const searchField = (searchField) => {
  return {
    type: SEARCH_FIELD,
    payload: { filteredSearch: { search: searchField } },
  };
};
