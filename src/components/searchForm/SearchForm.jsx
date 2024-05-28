import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';
import fetchRequest from '../../gateways/serverRequests.js';
import RenderFlights from '../renderFlights/RenderFlights.jsx';
import FlightsTitles from '../flightTitles/FlightsTitles.jsx';
import SearchField from '../searchField/SearchField.jsx';
import DatePanel from '../datePanel/DatePanel.jsx';
import FlightButtons from '../flightButtons/FlightButtons.jsx';

import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';

const SearchForm = ({
  printFlights,
  searchFlight,
  event,
  filteredDepartures,
  setFilteredFlights,
  onClickFlights,
  onClickSearchFlight,
  filterCodeShare,
  filterCodeShar,
}) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [clickFlightTypeButton, setClickFlightTypeButton] =
    useState('departures');

  const [pickedDate, setPickedDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onClickDate = (date) => {
    setPickedDate(date);
    fetchFlightsForDate(date);
  };

  const fetchFlightsForDate = (date) => {
    fetchRequest().then((data) => {
      const filteredFlights = data.filter(({ departureDate, arrivalDate }) => {
        return (
          new Date(departureDate).toDateString() === date.toDateString() ||
          new Date(arrivalDate).toDateString() === date.toDateString()
        );
      });
      setFlights(filteredFlights);
    });
  };

  const flightTypeParams = searchParams.get('type');

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setPickedDate(date);
    fetchFlightsForDate(date);
  };

  const pickedDateFromURL = searchParams.get('selectedDate');

  useEffect(() => {
    if (!pickedDateFromURL) {
      const searchParams = createSearchParams({
        selectedDate: new Date().toLocaleDateString(),
        type: 'departures',
      });
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
    if (pickedDateFromURL) {
      const [day, month, year] = pickedDateFromURL.split('.');
      const formattedDate = `${year}-${month}-${day}`;
      setPickedDate(new Date(formattedDate));
      fetchFlightsForDate(new Date(formattedDate));
    }
  }, [searchParams]);

  const filterDepartures = flights.filter(
    ({ departureDate, departureCity, codeShare }) =>
      departureCity.toLowerCase().match(input.toLowerCase()) &&
      new Date(departureDate).toDateString() ===
        new Date(pickedDate).toDateString() &&
      new Date(pickedDate).toDateString() ===
        new Date(pickedDateFromURL).toDateString()
  );
  const filterDeparturesCodeShare = filterDepartures.filter(({ codeShare }) => {
    return codeShare.includes(searchFlight.searchFlights.searchFlight);
  });
  const filterArrivals = flights.filter(
    ({ arrivalCity, arrivalDate, codeShare }) =>
      arrivalCity.toLowerCase().match(input.toLowerCase()) &&
      new Date(arrivalDate).toDateString() ===
        new Date(pickedDate).toDateString()
  );
  const filterArrivalsCodeShare = filterArrivals.filter(({ codeShare }) => {
    return codeShare.includes(searchFlight.searchFlights.searchFlight);
  });

  return (
    <div className="container">
      <SearchField
        input={input}
        onClickSearchFlight={onClickSearchFlight}
        onClickFlights={onClickFlights}
        filterDepartures={filterDepartures}
        filterArrivals={filterArrivals}
        setInput={setInput}
        flights={flights}
        setFlights={setFlights}
      />
      <FlightButtons
        input={input}
        flights={flights}
        setFlights={setFlights}
        filterArrivalsCodeShare={filterArrivalsCodeShare}
        filterDeparturesCodeShare={filterDeparturesCodeShare}
        filteredDepartures={filteredDepartures}
        setFilteredFlights={setFilteredFlights}
        filterArrivals={filterArrivals}
        filterDepartures={filterDepartures}
        setClickFlightTypeButton={setClickFlightTypeButton}
        clickFlightTypeButton={clickFlightTypeButton}
        searchParams={searchParams}
        pickedDate={pickedDate}
      />
      <DatePanel
        onChangeDate={onChangeDate}
        onClickDate={onClickDate}
        pickedDate={pickedDate}
      />
      <FlightsTitles
        filterArrivals={filterArrivals}
        filterDepartures={filterDepartures}
      />

      <RenderFlights
        flights={flights}
        filterCodeShare={filterCodeShare}
        filterArrivalsCodeShare={filterArrivalsCodeShare}
        filterDeparturesCodeShare={filterDeparturesCodeShare}
        filterArrivals={filterArrivals}
        filterDepartures={filterDepartures}
        filteredDepartures={filteredDepartures}
        clickFlightTypeButton={setClickFlightTypeButton}
      />
    </div>
  );
};

const mapState = (state) => {
  return {
    flightsList: flightsSelector(state),
    searchFlight: searchFlightsSelector(state),
  };
};

const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
  searchFlights,
};

export default connect(mapState, mapDispatch)(SearchForm);

SearchForm.propTypes = {
  searchFlights: PropTypes.func,
  printArrivals: PropTypes.func,
  printDepartures: PropTypes.func,
  printFlights: PropTypes.func,
};
