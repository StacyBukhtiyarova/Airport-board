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

const SearchForm = ({ printFlights, searchFlights }) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const [clickArrivals, setClickArrivals] = useState(false);
  const [clickDepartures, setClickDepartures] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onClickFlights = (e) => {
    e.preventDefault();
    setModalWindow(false);
    return fetchRequest().then((data) => {
      setFlights(data), dispatch(printFlights(data));
    });
  };

  const onClickSearchFlight = (e) => {
    setInput(e.target.value);
    dispatch(searchFlights(e.target.value));
  };

  const onClickDate = (date) => {
    setPickedDate(date);
    fetchFlightsForDate(date);
    const searchParams = createSearchParams({
      selectedDate: date.toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
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
  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setPickedDate(date);
    fetchFlightsForDate(date);
    const searchParams = createSearchParams({
      selectedDate: date.toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  const pickedDateFromURL = searchParams.get('selectedDate');
  useEffect(() => {
    if (pickedDateFromURL) {
      const [day, month, year] = pickedDateFromURL.split('.');
      const formattedDate = `${year}-${month}-${day}`;
      setPickedDate(new Date(formattedDate));
      fetchFlightsForDate(new Date(formattedDate));
    }
  }, [searchParams]);

  const filterDepartures = flights.filter(
    ({ departureDate, departureCity }) =>
      departureCity.toLowerCase().match(input.toLowerCase()) &&
      new Date(departureDate).toDateString() ===
        new Date(pickedDate).toDateString() &&
      new Date(pickedDate).toDateString() ===
        new Date(pickedDateFromURL).toDateString()
  );

  const filterArrivals = flights.filter(
    ({ arrivalCity, arrivalDate }) =>
      arrivalCity.toLowerCase().match(input.toLowerCase()) &&
      new Date(arrivalDate).toDateString() ===
        new Date(pickedDate).toDateString()
  );

  return (
    <div className="container">
      <SearchField
        modalWindow={modalWindow}
        setModalWindow={setModalWindow}
        onClickSearchFlight={onClickSearchFlight}
        onClickFlights={onClickFlights}
        filterDepartures={filterDepartures}
        filterArrivals={filterArrivals}
      />
      <FlightButtons
        filterArrivals={filterArrivals}
        filterDepartures={filterDepartures}
        setClickArrivals={setClickArrivals}
        setClickDepartures={setClickDepartures}
        searchParams={searchParams}
        pickedDateFromURL={pickedDateFromURL}
        setPickedDate={setPickedDate}
        pickedDate={pickedDate}
        setFlights={setFlights}
        fetchFlightsForDate={fetchFlightsForDate}
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
        filterDepartures={filterDepartures}
        filterArrivals={filterArrivals}
        clickArrivals={clickArrivals}
        clickDepartures={clickDepartures}
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
